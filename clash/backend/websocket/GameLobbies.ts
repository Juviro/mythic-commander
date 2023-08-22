import { Server } from 'socket.io';
import uniqid from 'uniqid';

import SOCKET_MSG from '../../constants/wsEvents';
import { Lobby, User } from './GameLobby.types';

const DUMMY_LOBBY = {
  lobbyId: '1',
  name: 'test',
  players: [
    {
      id: '1',
      username: 'test',
    },
  ],
  hostId: '1',
  hostName: 'test',
  maxPlayers: 4,
};

export class GameLobbies {
  ws: Server;

  openLobbies: Lobby[] = [];

  constructor(ws: Server) {
    this.ws = ws;
    this.openLobbies = [DUMMY_LOBBY];
  }

  private addLobby(name: string, user: User) {
    const lobby: Lobby = {
      lobbyId: uniqid(),
      name,
      players: [user],
      hostId: user.id,
      hostName: user.username,
      maxPlayers: 4,
    };
    this.openLobbies.push(lobby);
  }

  leaveAll(user: User) {
    this.openLobbies = this.openLobbies.filter((lobby) => {
      if (lobby.hostId === user.id) {
        this.ws.to(lobby.lobbyId).emit(SOCKET_MSG.CLOSE_LOBBY);
        return false;
      }
      // eslint-disable-next-line no-param-reassign
      lobby.players = lobby.players.filter((player) => player.id !== user.id);
      return true;
    });
    this.ws.emit(SOCKET_MSG.UPDATE_LOBBIES, this.openLobbies);
  }

  open(name: string, user: User) {
    this.addLobby(name, user);
    this.ws.emit(SOCKET_MSG.UPDATE_LOBBIES, this.openLobbies);
  }

  emitLobbies(socket: any = this.ws) {
    socket.emit(SOCKET_MSG.UPDATE_LOBBIES, this.openLobbies);
  }
}
