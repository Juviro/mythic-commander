import { Card, GameState } from 'backend/database/gamestate.types';
import { SOCKET_MSG_GAME } from 'backend/constants/wsEvents';
import { Server, Socket } from 'socket.io';
import { User } from 'backend/database/getUser';

interface StoredPlayer {
  userId: string;
  name: string;
  socket: Socket;
}

// TODO: add player color for sleeves

export default class Game {
  server: Server;

  gameState: GameState;

  players: { [key: string]: StoredPlayer } = {};

  constructor(gameState: GameState, server: Server) {
    this.server = server;
    this.gameState = gameState;
  }

  get id() {
    return this.gameState.gameId;
  }

  obfuscateGameState(userId: string): GameState {
    const obfuscatedPlayers = this.gameState.players.map((player) => {
      const isSelf = player.id === userId;
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
    });

    return { ...this.gameState, players: obfuscatedPlayers };
  }

  emitGameState(socket: Socket) {
    const { userId } = this.players[socket.id];
    socket.emit(SOCKET_MSG_GAME.GAME_STATE, this.obfuscateGameState(userId));
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
}
