import { Server } from 'socket.io';
import SOCKET_MSG from '../../constants/wsEvents';
import { GameLobbies } from './GameLobbies';
import { User } from './GameLobby.types';
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

    socket.on(SOCKET_MSG.INITIALIZE, async () => {
      try {
        user = await getUser(socket.handshake.headers.cookie);
        socket.emit(SOCKET_MSG.INITIALIZE, user);
        Lobby.emitLobbies(socket);
      } catch {
        socket.emit(SOCKET_MSG.NOT_LOGGED_IN);
      }
    });

    socket.on(SOCKET_MSG.HOST_GAME, (lobbyOptions) => {
      const parsedLobbyOptions = JSON.parse(lobbyOptions);
      Lobby.open(parsedLobbyOptions, user);
    });

    socket.on('disconnect', () => {
      if (!user) return;
      Lobby.leaveAll(user);
    });
  });

  res.end();
};

export default websocket;
