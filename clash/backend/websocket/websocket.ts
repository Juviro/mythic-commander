import { Server } from 'socket.io';
import { SOCKET_MSG_BROWSER } from '../../constants/wsEvents';
import { GameLobbies } from './GameLobbies';
import { Deck, Lobby as LobbyType, User } from './GameLobby.types';
import getUser from './getUser';

const websocket = (_: any, res: any) => {
  if (res.socket?.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket?.server);
  res.socket.server.io = io;

  const Lobby = new GameLobbies(io);

  io.on('connection', (socket) => {
    socket.join('lobby');
    let user: User;

    socket.on(SOCKET_MSG_BROWSER.INITIALIZE, async () => {
      try {
        user = await getUser(socket.handshake.headers.cookie);
        socket.emit(SOCKET_MSG_BROWSER.INITIALIZE, user);
        Lobby.emitLobbies(socket);
      } catch {
        socket.emit(SOCKET_MSG_BROWSER.NOT_LOGGED_IN);
      }
    });

    socket.on(SOCKET_MSG_BROWSER.HOST_LOBBY, (lobbyOptions) => {
      const parsedLobbyOptions: LobbyType = JSON.parse(lobbyOptions);
      Lobby.open(parsedLobbyOptions, user);
    });

    socket.on(SOCKET_MSG_BROWSER.JOIN_LOBBY, (id: string) => {
      Lobby.join(id, user);
    });
    socket.on(SOCKET_MSG_BROWSER.LEAVE_LOBBY, () => {
      Lobby.leaveAll(user);
    });
    socket.on(SOCKET_MSG_BROWSER.SELECT_DECK, (deck: string) => {
      const parsedDeck: Deck = JSON.parse(deck);
      Lobby.setDeck(parsedDeck, user);
    });

    socket.on('disconnect', () => {
      if (!user) return;
      Lobby.leaveAll(user);
    });
  });

  res.end();
};

export default websocket;
