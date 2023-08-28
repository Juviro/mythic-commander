import { Card, GameState, Player } from 'backend/database/gamestate.types';
import { SOCKET_MSG_GAME, SOCKET_MSG_GENERAL } from 'backend/constants/wsEvents';
import { Server, Socket } from 'socket.io';
import { User } from 'backend/database/getUser';

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

  // ##################### Actions #####################

  drawCard(socket: Socket) {
    const player = this.getPlayer(socket);
    const card = player.zones.library.pop();
    if (!card) return;

    player.zones.hand.push(card);
    this.emitPlayerUpdate(socket, player);
  }
}
