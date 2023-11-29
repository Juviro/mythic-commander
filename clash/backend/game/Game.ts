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
  SetCommanderTimesCastedPayload,
} from 'backend/constants/wsEvents';
import { Server, Socket } from 'socket.io';
import { User as DatabaseUser } from 'backend/database/getUser';
import { GameLog, LOG_MESSAGES, LogMessage } from 'backend/constants/logMessages';

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

  // ##################### Utils #####################

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
    this.gameState.gameLog.push(newLogEntry);

    this.server.to(this.id).emit(SOCKET_MSG_GAME.GAME_LOG, newLogEntry);
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

  sendChatMessage(socket: Socket, message: string) {
    const player = this.getPlayerBySocket(socket);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.CHAT_MESSAGE,
      payload: message.slice(0, 1000),
    });
  }

  setCommanderTimesCasted(socket: Socket, payload: SetCommanderTimesCastedPayload) {
    const player = this.getPlayerBySocket(socket);

    const isOwnCommander = player.commanders.some(
      ({ clashId }) => clashId === payload.commanderClashId
    );

    if (!isOwnCommander || payload.amount < 0) return;

    let commanderName = '';
    player.commanders.forEach((commander) => {
      if (commander.clashId !== payload.commanderClashId) return;
      // eslint-disable-next-line no-param-reassign
      commander.timesCasted = payload.amount;
      commanderName = commander.name;
    })!;

    this.emitPlayerUpdate(player);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_COMMANDER_TIMES_CASTED,
      payload: {
        ...payload,
        commanderName,
      },
    });
  }
}
