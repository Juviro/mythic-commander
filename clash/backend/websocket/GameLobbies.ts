/* eslint-disable no-param-reassign */
import { Server, Socket } from 'socket.io';
import uniqid from 'uniqid';

import { SOCKET_MSG_BROWSER } from '../../constants/wsEvents';
import { Deck, GameOptions, Lobby, Player, User } from './GameLobby.types';

const DUMMY_LOBBY = {
  id: '1',
  name: "Juviro's Game",
  players: [
    {
      id: '109818915788176405213',
      avatar: '',
      username: 'Juviro',
      isReady: true,
    },
  ],
  hostId: '109818915788176405213',
  maxNumberOfPlayers: 2,
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

    return lobby.id;
  }

  emitLobbiesUpdate() {
    this.ws.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }

  leaveAll(user: User, socket: Socket) {
    this.openLobbies = this.openLobbies.filter((lobby) => {
      if (lobby.hostId === user.id) {
        return false;
      }
      lobby.players = lobby.players.filter((player) => player.id !== user.id);
      socket.leave(lobby.id);
      return true;
    });
    this.emitLobbiesUpdate();
  }

  open(lobbyOptions: GameOptions, user: User, socket: Socket) {
    const lobbyId = this.addLobby(lobbyOptions, user);
    this.emitLobbiesUpdate();
    socket.join(lobbyId);
  }

  join(id: string, user: User, socket: Socket) {
    const lobby = this.openLobbies.find((l) => l.id === id);
    if (!lobby) return;
    if (lobby.players.length >= lobby.maxNumberOfPlayers) return;
    if (lobby.players.find((player) => player.id === user.id)) return;
    if (lobby.starting) return;

    this.openLobbies.forEach((l) => {
      l.players = l.players.filter((player) => player.id !== user.id);
    });

    lobby.players.push({ ...user, deck: null, isReady: false });
    this.emitLobbiesUpdate();
    socket.join(id);
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
    this.emitLobbiesUpdate();
  }

  setDeck(deck: Deck, user: User) {
    this.updatePlayer(user, { deck });
  }

  isReady(isReady: boolean, user: User) {
    this.updatePlayer(user, { isReady });
  }

  startMatch(user: User) {
    const lobby = this.openLobbies.find(({ hostId }) => hostId === user.id);

    if (!lobby) return;

    lobby.starting = true;
    this.emitLobbiesUpdate();

    // TODO:
    // - create match in db
  }

  emitLobbies(socket: any = this.ws) {
    socket.emit(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, this.openLobbies);
  }
}
