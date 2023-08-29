import { Card, GameState, Player, VisibleCard } from 'backend/database/gamestate.types';
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

  players: { [key: string]: StoredPlayer } = {};

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
      isSelf,
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

  emitPlayerUpdate(socket: Socket, player: Player) {
    const messageToSelf = Game.obfuscatePlayer(player, true);
    socket.emit(SOCKET_MSG_GAME.UPDATE_PLAYER, messageToSelf);
    const messageToOthers = Game.obfuscatePlayer(player, false);
    socket.to(this.id).emit(SOCKET_MSG_GAME.UPDATE_PLAYER, messageToOthers);
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

  getPlayer(socket: Socket): Player {
    const { userId } = this.players[socket.id];
    const player = this.gameState.players.find(({ id }) => id === userId);
    if (!player) {
      socket.emit(SOCKET_MSG_GENERAL.ERROR, 'You are not in this game');
      throw new Error('Player not found');
    }
    return player;
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
    const player = this.getPlayer(socket);
    const card = player.zones.library.pop();
    if (!card) return;

    player.zones.hand.push(card);
    this.emitPlayerUpdate(socket, player);
    this.logAction(socket, LOG_MESSAGES.DRAW_CARD, { amount: 1 });
  }

  moveCard(socket: Socket, payload: MoveCardPayload) {
    const player = this.getPlayer(socket);
    const { clashId, toZone, position } = payload;

    const fromZone: Card[] = Object.values(player.zones).find((zone: Card[]) =>
      zone.some((card) => card.clashId === clashId)
    );
    const card = fromZone?.find((c) => c.clashId === clashId);
    const index = fromZone?.findIndex((c) => c.clashId === clashId);

    fromZone.splice(index, 1);
    player.zones[toZone].push({ ...card, position } as VisibleCard);

    this.emitPlayerUpdate(socket, player);
    this.logAction(socket, LOG_MESSAGES.DRAW_CARD, { amount: 1 });
  }
}
