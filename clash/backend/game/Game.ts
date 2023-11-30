import {
  Card,
  GameState,
  Player,
  VisibleCard,
  Zone,
} from 'backend/database/gamestate.types';
import {
  MoveCardPayload,
  SOCKET_MSG_GAME,
  SendMessagePayload,
  SetCommanderTimesCastedPayload,
  SetPhasePayload,
  SetPlayerLifePayload,
} from 'backend/constants/wsEvents';
import { Server, Socket } from 'socket.io';
import { User as DatabaseUser } from 'backend/database/getUser';
import { GameLog, LOG_MESSAGES, LogMessage } from 'backend/constants/logMessages';
import { getGameState, storeGameState } from 'backend/database/matchStore';
import initMatch from 'backend/lobby/initMatch';
import addLogEntry from './addLogEntry';

interface User {
  name: string;
  socket: Socket;
}

export default class Game {
  server: Server;

  gameState: GameState;

  users: { [userId: string]: User } = {};

  constructor(gameState: GameState, server: Server) {
    this.server = server;
    this.gameState = gameState;
  }

  get id() {
    return this.gameState.gameId;
  }

  // ##################### Socket #####################

  emitToAll(msg: string, data: any) {
    this.server.to(this.id).emit(msg, data);
  }

  emitGameState(socket: Socket, playerId: string) {
    socket.emit(SOCKET_MSG_GAME.GAME_STATE, this.obfuscateGameState(playerId));
  }

  emitGameUpdate() {
    const { activePlayerId, phase, turn } = this.gameState;
    this.emitToAll(SOCKET_MSG_GAME.GAME_STATE, { activePlayerId, phase, turn });
  }

  emitPlayerUpdate(player: Player) {
    // might be undefined if player is not connected
    const thatPlayerId = this.users[player.id]?.socket.id;
    const messageToThatPlayer = Game.obfuscatePlayer(player, true);
    const messageToOtherPlayers = Game.obfuscatePlayer(player, false);

    this.server.to(thatPlayerId).emit(SOCKET_MSG_GAME.UPDATE_PLAYER, messageToThatPlayer);
    this.server
      .to(this.id)
      .except(thatPlayerId)
      .emit(SOCKET_MSG_GAME.UPDATE_PLAYER, messageToOtherPlayers);
  }

  join(socket: Socket, user: DatabaseUser) {
    this.users[user.id] = {
      name: user.username,
      socket,
    };

    socket.join(this.id);
    this.emitGameState(socket, user.id);
  }

  // ##################### Game #####################

  storeGameState() {
    // currently, the game state is stored whenever the active player changes
    storeGameState(this.gameState.gameId, this.gameState);
  }

  async restartGame(socket: Socket) {
    const player = this.getPlayerBySocket(socket);
    if (player.id !== this.gameState.hostId) return;

    const { lobby } = await getGameState(this.gameState.gameId);
    await initMatch(lobby);
    const { gameState: newGameState } = await getGameState(this.gameState.gameId);

    this.gameState = newGameState;

    newGameState.players.forEach(({ id: playerId }) => {
      const user = this.users[playerId];
      // might be undefined if player is not connected
      if (!user) return;
      this.emitGameState(user.socket, playerId);
    });
  }

  // ##################### Utils #####################

  static obfuscatePlayer(player: Player, isSelf: boolean): Player {
    const obfuscateCard = ({ clashId, ownerId }: Card) => ({ clashId, ownerId });

    const hand = isSelf ? player.zones.hand : player.zones.hand.map(obfuscateCard);

    return {
      ...player,
      zones: {
        ...player.zones,
        library: player.zones.library.map(obfuscateCard),
        hand,
      },
    };
  }

  obfuscateGameState(playerId: string): GameState {
    const obfuscatedPlayers = this.gameState.players.map((player) => {
      const isSelf = player.id === playerId;
      return Game.obfuscatePlayer(player, isSelf);
    });

    return { ...this.gameState, players: obfuscatedPlayers };
  }

  getPlayerById(playerId: string): Player {
    return this.gameState.players.find(({ id }) => id === playerId) as Player;
  }

  getPlayerBySocket(socket: Socket): Player {
    const userId = Object.entries(this.users).find(
      ([, { socket: s }]) => s === socket
    )![0];
    return this.getPlayerById(userId);
  }

  logAction(log: LogMessage) {
    const { logKey, payload, playerId } = log;
    if (logKey === 'MOVE_CARD' && payload.to.zone === payload.from.zone) return;

    const newLogEntry = {
      playerId,
      timestamp: Date.now(),
      logKey,
      payload,
    } as GameLog;
    const oldLogLength = this.gameState.gameLog.length;
    const newLog = addLogEntry(this.gameState.gameLog, newLogEntry);

    this.gameState.gameLog = newLog;

    this.server.to(this.id).emit(SOCKET_MSG_GAME.GAME_LOG, {
      ...newLog.at(-1),
      overwritesPreviousLog: oldLogLength === newLog.length,
    });
  }

  // ##################### Actions #####################

  drawCard(socket: Socket) {
    const player = this.getPlayerBySocket(socket);
    const card = player.zones.library.pop();
    if (!card) return;

    player.zones.hand.push(card);
    this.emitPlayerUpdate(player);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.DRAW_CARD,
      payload: { amount: 1 },
    });
  }

  moveCard(socket: Socket, payload: MoveCardPayload) {
    const { clashId, to, position, index } = payload;
    const playersToUpdate = new Set<string>([to.playerId]);

    let fromPlayer: Player;
    let fromZone: Zone;
    let cardToMove: VisibleCard;

    let spliceIndex = -1;

    this.gameState.players.forEach((player) =>
      Object.entries(player.zones).forEach(([zone, cards]) =>
        (cards as Card[]).some((card, i) => {
          if (card.clashId !== clashId) return false;
          fromPlayer = player;
          fromZone = zone as Zone;
          spliceIndex = i;
          cardToMove = cards.splice(i, 1)[0] as VisibleCard;
          return true;
        })
      )
    );

    if (fromZone! === 'library' && to.zone === 'hand') {
      this.drawCard(socket);
      return;
    }

    const newCard = { ...cardToMove!, position };
    if (fromPlayer!.id !== to.playerId && !newCard.ownerId) {
      newCard.ownerId = fromPlayer!.id;
    }

    playersToUpdate.add(fromPlayer!.id);
    const toPlayer = this.getPlayerById(to.playerId);
    if (typeof index === 'number') {
      const isMovingToSameZone = fromZone! === to.zone && fromPlayer!.id === to.playerId;
      const addIndex = spliceIndex < index && isMovingToSameZone ? index - 1 : index;
      toPlayer.zones[to.zone].splice(addIndex, 0, newCard);
    } else {
      toPlayer.zones[to.zone].push(newCard);
    }

    playersToUpdate.forEach((playerId) => {
      const player = this.getPlayerById(playerId);
      this.emitPlayerUpdate(player);
    });

    const playerId = this.getPlayerBySocket(socket).id;
    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.MOVE_CARD,
      payload: {
        cardName: cardToMove!.name,
        from: {
          zone: fromZone!,
          playerName: fromPlayer!.name,
        },
        to: {
          zone: to.zone,
          playerName: toPlayer.name,
        },
      },
    });
  }

  sendChatMessage(socket: Socket, { message }: SendMessagePayload) {
    const player = this.getPlayerBySocket(socket);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.CHAT_MESSAGE,
      payload: { message: message.slice(0, 1000) },
    });
  }

  setCommanderTimesCasted(socket: Socket, payload: SetCommanderTimesCastedPayload) {
    const player = this.getPlayerBySocket(socket);

    const isOwnCommander = player.commanders.some(
      ({ clashId }) => clashId === payload.commanderClashId
    );

    if (!isOwnCommander || payload.total < 0) return;

    let commanderName = '';
    let previousTotal = 0;
    player.commanders.forEach((commander) => {
      if (commander.clashId !== payload.commanderClashId) return;
      previousTotal = commander.timesCasted;
      // eslint-disable-next-line no-param-reassign
      commander.timesCasted = payload.total;
      commanderName = commander.name;
    })!;

    this.emitPlayerUpdate(player);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_COMMANDER_TIMES_CASTED,
      payload: {
        ...payload,
        previousTotal,
        commanderName,
      },
    });
  }

  setPlayerLife(socket: Socket, payload: SetPlayerLifePayload) {
    const player = this.getPlayerBySocket(socket);

    let previousTotal = 0;
    this.gameState.players.forEach((p) => {
      if (p.id !== payload.forPlayerId) return;
      previousTotal = p.life;
      // eslint-disable-next-line no-param-reassign
      p.life = payload.total;
    });

    const forPlayer = this.getPlayerById(payload.forPlayerId);

    this.emitPlayerUpdate(forPlayer);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_LIFE,
      payload: {
        ...payload,
        previousTotal,
        fromPlayerId: player.id,
      },
    });
  }

  endTurn(socket: Socket) {
    const player = this.getPlayerBySocket(socket);
    const { players, activePlayerId } = this.gameState;
    const activePlayerIndex = players.findIndex(({ id }) => id === activePlayerId);

    const newActivePlayerIndex = (activePlayerIndex + 1) % players.length;

    if (newActivePlayerIndex === 0) {
      this.gameState.turn += 1;
    }

    this.gameState.activePlayerId = players[newActivePlayerIndex].id;
    this.gameState.phase = 'beginning';

    this.emitGameUpdate();

    this.storeGameState();

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_ACTIVE_PLAYER,
      payload: {
        activePlayerId: players[newActivePlayerIndex].id,
      },
    });
  }

  setPhase(socket: Socket, payload: SetPhasePayload) {
    const player = this.getPlayerBySocket(socket);
    this.gameState.phase = payload.phase;

    const activePlayer = this.getPlayerById(this.gameState.activePlayerId);

    this.emitGameUpdate();

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_PHASE,
      payload: {
        ...payload,
        activePlayerId: activePlayer.id,
      },
    });
  }
}
