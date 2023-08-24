/* eslint-disable no-param-reassign */
import { Server, Socket } from 'socket.io';
import uniqid from 'uniqid';

import initMatch from 'backend/match/initMatch';
import { User } from 'backend/database/getUser';
import { SOCKET_MSG_LOBBY } from '../constants/wsEvents';
import { Deck, GameOptions, Lobby, Player } from './GameLobby.types';

export const LOBBY_ROOM = 'lobby';

export class GameLobbies {
  ws: Server;

  openLobbies: Lobby[] = [];

  constructor(ws: Server) {
    this.ws = ws;
    this.openLobbies = [];
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

  emitLobbiesUpdate(to: string = LOBBY_ROOM) {
    this.ws.to(to).emit(SOCKET_MSG_LOBBY.UPDATE_LOBBIES, this.openLobbies);
  }

  leaveAll(user: User, socket: Socket) {
    let shouldEmit = false;
    this.openLobbies = this.openLobbies.filter((lobby) => {
      if (lobby.hostId === user.id) {
        shouldEmit = true;
        return false;
      }
      const isInLobby = lobby.players.some((player) => player.id === user.id);
      if (!isInLobby) return true;

      lobby.players = lobby.players.filter((player) => player.id !== user.id);
      socket.leave(lobby.id);
      shouldEmit = true;
      return true;
    });
    if (!shouldEmit) return;

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

    initMatch(lobby);
  }
}
