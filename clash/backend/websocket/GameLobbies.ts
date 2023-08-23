import { Server } from 'socket.io';
import uniqid from 'uniqid';

import { SOCKET_MSG_BROWSER } from '../../constants/wsEvents';
import { Deck, GameOptions, Lobby, Player, User } from './GameLobby.types';

/* eslint-disable no-param-reassign */

const DUMMY_LOBBY = {
  id: '1',
  name: 'My first Game',
  players: [
    {
      id: '1',
      avatar: '',
      username: 'Dieter-Johann',
      isReady: true,
    },
  ],
  hostId: '1',
  maxNumberOfPlayers: 4,
};

export class GameLobbies {
  ws: Server;

  openLobbies: Lobby[] = [];

  constructor(ws: Server) {
    this.ws = ws;
    // this.openLobbies = [];
    this.openLobbies = [DUMMY_LOBBY];
  }

  private addLobby(lobbyOptions: GameOptions, user: User) {
    const lobby: Lobby = {
      id: uniqid(),
      name: lobbyOptions.name,
      players: [{ ...user, deck: null, isReady: false }],
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
      l.players = l.players.filter((player) => player.id !== user.id);
    });

    lobby.players.push({ ...user, deck: null, isReady: false });
    this.ws.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }

  updatePlayer(user: User, updatedValues: Partial<Player>) {
    const lobby = this.openLobbies.find((l) =>
      l.players.some((player) => player.id === user.id)
    );
    if (!lobby) return;

    lobby.players.forEach((player) => {
      if (player.id !== user.id) return;
      Object.keys(updatedValues).forEach((key) => {
        // @ts-ignore
        player[key] = updatedValues[key];
      });
    });
    this.ws.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }

  setDeck(deck: Deck, user: User) {
    this.updatePlayer(user, { deck });
  }

  isReady(isReady: boolean, user: User) {
    this.updatePlayer(user, { isReady });
  }

  emitLobbies(socket: any = this.ws) {
    socket.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }
}
