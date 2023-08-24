import { GameState } from 'backend/database/gamestate.types';
import { SOCKET_MSG_GAME } from 'backend/constants/wsEvents';
import { Server, Socket } from 'socket.io';

export default class Game {
  server: Server;

  gameState: GameState;

  constructor(gameState: GameState, server: Server) {
    this.server = server;
    this.gameState = gameState;
  }

  get id() {
    return this.gameState.gameId;
  }

  join(socket: Socket) {
    socket.join(this.id);
    socket.emit(SOCKET_MSG_GAME.GAME_STATE, this.gameState);
  }
}
