import { Server } from 'socket.io';
import uniqid from 'uniqid';

import SOCKET_MSG from '../constants/wsEvents';
import { Lobby, User } from './GameLobby.types';

export class GameLobby {
  ws: Server;

  openLobbies: Lobby[] = [];

  constructor(ws: Server) {
    this.ws = ws;
    this.openLobbies = [];
  }

  private addLobby(name: string, user: User) {
    const lobby: Lobby = {
      id: uniqid(),
      name,
      players: [user],
      host: user.id,
    };
    this.openLobbies.push(lobby);
    console.log('lobby', lobby);
  }

  leaveAll(user: User) {}

  open(name: string, user: User) {
    this.addLobby(name, user);
    this.ws.to('lobby').emit(SOCKET_MSG.UPDATE_LOBBIES, this.openLobbies);
  }
}
