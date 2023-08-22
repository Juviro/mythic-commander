import { Server } from 'socket.io';
import uniqid from 'uniqid';

import SOCKET_MSG from '../../constants/wsEvents';
import { Lobby, User } from './GameLobby.types';
import { GameOptions } from '../../types/api.types';

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
  numberOfPlayers: 4,
};

const DUMMY_LOBBIES = [...new Array(15)].map((_, i) => ({
  lobbyId: i.toString(),
  name: `test${i}`,
  players: [
    {
      id: i.toString(),
      username: `test${i}`,
    },
  ],
  hostId: i.toString(),
  hostName: `test${i}`,
  numberOfPlayers: 4,
}));

export class GameLobbies {
  ws: Server;

  openLobbies: Lobby[] = [];

  constructor(ws: Server) {
    this.ws = ws;
    this.openLobbies = DUMMY_LOBBIES;
  }

  private addLobby(lobbyOptions: GameOptions, user: User) {
    const lobby: Lobby = {
      lobbyId: uniqid(),
      name: lobbyOptions.name,
      players: [user],
      hostId: user.id,
      hostName: user.username,
      numberOfPlayers: lobbyOptions.numberOfPlayers,
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

  open(lobbyOptions: GameOptions, user: User) {
    this.addLobby(lobbyOptions, user);
    this.ws.emit(SOCKET_MSG.UPDATE_LOBBIES, this.openLobbies);
  }

  emitLobbies(socket: any = this.ws) {
    socket.emit(SOCKET_MSG.UPDATE_LOBBIES, this.openLobbies);
  }
}
