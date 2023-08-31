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
  SOCKET_MSG_GENERAL,
} from 'backend/constants/wsEvents';
import { Server, Socket } from 'socket.io';
import { User } from 'backend/database/getUser';
import { LOG_MESSAGES, LogKey, LogPayload } from 'backend/constants/logMessages';

interface StoredPlayer {
  userId: string;
  name: string;
  socket: Socket;
}

export default class Game {
  server: Server;

  gameState: GameState;

  players: { [socketId: string]: StoredPlayer } = {};

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

  obfuscateGameState(userId: string): GameState {
    const obfuscatedPlayers = this.gameState.players.map((player) => {
      const isSelf = player.id === userId;
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

  emitGameState(socket: Socket) {
    const { userId } = this.players[socket.id];
    socket.emit(SOCKET_MSG_GAME.GAME_STATE, this.obfuscateGameState(userId));
  }

  emitPlayerUpdate(player: Player) {
    const thatPlayerId = this.getSocketId(player.id);
    const messageToThatPlayer = Game.obfuscatePlayer(player, true);
    const messageToOtherPlayers = Game.obfuscatePlayer(player, false);

    this.server.to(thatPlayerId).emit(SOCKET_MSG_GAME.UPDATE_PLAYER, messageToThatPlayer);
    this.server
      .to(this.id)
      .except(thatPlayerId)
      .emit(SOCKET_MSG_GAME.UPDATE_PLAYER, messageToOtherPlayers);
  }

  join(socket: Socket, user: User) {
    this.players[socket.id] = {
      userId: user.id,
      name: user.username,
      socket,
    };

    socket.join(this.id);
    this.emitGameState(socket);
  }

  // ##################### Utils #####################

  getSelf(socket: Socket): Player {
    const { userId } = this.players[socket.id];
    const player = this.gameState.players.find(({ id }) => id === userId);
    if (!player) {
      socket.emit(SOCKET_MSG_GENERAL.ERROR, 'You are not in this game');
      throw new Error('Player not found');
    }
    return player;
  }

  getPlayer(playerId: string): Player {
    return this.gameState.players.find(({ id }) => id === playerId) as Player;
  }

  getSocketId(playerId: string) {
    return Object.values(this.players).find(({ userId: id }) => id === playerId)?.socket
      .id as string;
  }

  logAction(socket: Socket, message: LogKey, payload: LogPayload) {
    const { userId } = this.players[socket.id];
    const newLogEntry = {
      playerId: userId,
      timestamp: Date.now(),
      logKey: message,
      payload,
    };
    this.gameState.gameLog.push(newLogEntry);

    this.server.to(this.id).emit(SOCKET_MSG_GAME.GAME_LOG, newLogEntry);
  }

  // ##################### Actions #####################

  drawCard(socket: Socket) {
    const player = this.getSelf(socket);
    const card = player.zones.library.pop();
    if (!card) return;

    player.zones.hand.push(card);
    this.emitPlayerUpdate(player);
    this.logAction(socket, LOG_MESSAGES.DRAW_CARD, { amount: 1 });
  }

  moveCard(socket: Socket, payload: MoveCardPayload) {
    const { clashId, to, position } = payload;
    const playersToUpdate = new Set<string>([to.playerId]);

    let fromPlayer: Player;
    let fromZone: Zone;
    let cardToMove: VisibleCard;

    this.gameState.players.forEach((player) =>
      Object.entries(player.zones).forEach(([zone, cards]) =>
        (cards as Card[]).some((card, index) => {
          if (card.clashId !== clashId) return false;
          fromPlayer = player;
          fromZone = zone as Zone;
          cardToMove = cards.splice(index, 1)[0] as VisibleCard;
          return true;
        })
      )
    );

    const newCard = { ...cardToMove!, position };
    if (fromPlayer!.id !== to.playerId && !newCard.ownerId) {
      newCard.ownerId = fromPlayer!.id;
    }

    playersToUpdate.add(fromPlayer!.id);
    const toPlayer = this.getPlayer(to.playerId);
    toPlayer.zones[to.zone].push(newCard);

    playersToUpdate.forEach((playerId) => {
      const player = this.getPlayer(playerId);
      this.emitPlayerUpdate(player);
    });

    this.logAction(socket, LOG_MESSAGES.MOVE_CARD, {
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
