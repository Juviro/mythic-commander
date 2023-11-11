import {
  Card,
  GameState,
  Player,
  VisibleCard,
  Zone,
} from 'backend/database/gamestate.types';
import { MoveCardPayload, SOCKET_MSG_GAME } from 'backend/constants/wsEvents';
import { Server, Socket } from 'socket.io';
import { User as DatabaseUser } from 'backend/database/getUser';
import { LOG_MESSAGES, LogKey, LogPayload } from 'backend/constants/logMessages';

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

    // TODO: remove this later
    if (!gameState.gameLog) {
      this.gameState.gameLog = [];
    }
  }

  static obfuscatePlayer(player: Player, isSelf: boolean): Player {
    const obfuscateCard = ({ clashId }: Card) => ({ clashId });

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
    const thatPlayerId = this.users[player.id].socket.id;
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

  logAction(playerId: string, message: LogKey, payload: LogPayload) {
    const newLogEntry = {
      playerId,
      timestamp: Date.now(),
      logKey: message,
      payload,
    };
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
    this.logAction(player.id, LOG_MESSAGES.DRAW_CARD, { amount: 1 });
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

    this.logAction(this.getPlayerBySocket(socket).id, LOG_MESSAGES.MOVE_CARD, {
      cardName: cardToMove!.name,
      from: {
        zone: fromZone!,
        playerName: fromPlayer!.name,
      },
      to: {
        zone: to.zone,
        playerName: toPlayer.name,
      },
    });
  }
}
