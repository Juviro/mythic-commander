import { Server } from 'socket.io';
import uniqid from 'uniqid';

import { SOCKET_MSG_BROWSER } from '../../constants/wsEvents';
import { Lobby, User } from './GameLobby.types';
import { GameOptions } from '../../types/api.types';

const DUMMY_LOBBY = {
  id: '1',
  name: 'My first Game',
  players: [
    {
      id: '1',
      avatar: '',
      username: 'Dieter-Johann',
    },
  ],
  hostId: '1',
  maxNumberOfPlayers: 4,
};

const DUMMY_LOBBIES = [...new Array(15)].map((_, i) => ({
  id: i.toString(),
  name: `test${i}`,
  players: [
    {
      id: i.toString(),
      username: `test${i}`,
    },
  ],
  hostId: i.toString(),
  maxNumberOfPlayers: 4,
}));

export class GameLobbies {
  ws: Server;

  openLobbies: Lobby[] = [];

  constructor(ws: Server) {
    this.ws = ws;
    // this.openLobbies = [];
    this.openLobbies = [DUMMY_LOBBY];
    // this.openLobbies = DUMMY_LOBBIES;
  }

  private addLobby(lobbyOptions: GameOptions, user: User) {
    const lobby: Lobby = {
      id: uniqid(),
      name: lobbyOptions.name,
      players: [user],
      hostId: user.id,
      maxNumberOfPlayers: lobbyOptions.maxNumberOfPlayers,
    };
    this.openLobbies.push(lobby);
  }

  leaveAll(user: User) {
    this.openLobbies = this.openLobbies.filter((lobby) => {
      if (lobby.hostId === user.id) {
        return false;
      }
      // eslint-disable-next-line no-param-reassign
      lobby.players = lobby.players.filter((player) => player.id !== user.id);
      return true;
    });
    this.ws.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }

  open(lobbyOptions: GameOptions, user: User) {
    this.addLobby(lobbyOptions, user);
    this.ws.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }

  join(id: string, user: User) {
    const lobby = this.openLobbies.find((l) => l.id === id);
    if (!lobby) return;
    if (lobby.players.length >= lobby.maxNumberOfPlayers) return;
    if (lobby.players.find((player) => player.id === user.id)) return;
    this.openLobbies.forEach((l) => {
      // eslint-disable-next-line no-param-reassign
      l.players = l.players.filter((player) => player.id !== user.id);
    });

    lobby.players.push(user);
    this.ws.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }

  emitLobbies(socket: any = this.ws) {
    socket.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }
}
