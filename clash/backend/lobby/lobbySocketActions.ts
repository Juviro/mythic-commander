import { Server } from 'socket.io';

import { SOCKET_MSG_GENERAL, SOCKET_MSG_LOBBY } from '../constants/wsEvents';
import { GameLobby } from './GameLobby';
import { Deck, Lobby as LobbyType } from './GameLobby.types';
import getUser, { User } from '../database/getUser';

const lobbySocketActions = (io: Server) => {
  const Lobby = new GameLobby(io);

  io.on('connection', (socket) => {
    let user: User;

    socket.on(SOCKET_MSG_LOBBY.INITIALIZE, async () => {
      socket.join('lobby');
      try {
          user = await getUser(socket.handshake.headers.cookie);
          socket.emit(SOCKET_MSG_LOBBY.INITIALIZE, user);
          Lobby.emitLobbiesUpdate(socket.id);
      } catch {
        socket.emit(SOCKET_MSG_GENERAL.NOT_LOGGED_IN);
      }
    });

    socket.on(SOCKET_MSG_LOBBY.HOST_LOBBY, (lobbyOptions) => {
      const parsedLobbyOptions: LobbyType = JSON.parse(lobbyOptions);
      Lobby.open(parsedLobbyOptions, user, socket);
    });

    socket.on(SOCKET_MSG_LOBBY.JOIN_LOBBY, (id: string) => {
      Lobby.join(id, user, socket);
    });

    socket.on(SOCKET_MSG_LOBBY.LEAVE_LOBBY, () => {
      Lobby.leaveAll(user, socket);
    });

    socket.on(SOCKET_MSG_LOBBY.SELECT_COLOR, (color: string) => {
      Lobby.setColor(color, user);
    });

    socket.on(SOCKET_MSG_LOBBY.SELECT_DECK, (deck: string) => {
      const parsedDeck: Deck = JSON.parse(deck);
      Lobby.setDeck(parsedDeck, user);
    });

    socket.on(SOCKET_MSG_LOBBY.READY, (isReady: string) => {
      const isReadyBool = isReady === 'true';
      Lobby.isReady(isReadyBool, user);
    });

    socket.on(SOCKET_MSG_LOBBY.START_MATCH, () => {
      Lobby.startMatch(user);
    });

    socket.on('disconnect', () => {
      if (!user) return;
      Lobby.leaveAll(user, socket);
    });
  });
};

export default lobbySocketActions;
