import { Server } from 'socket.io';
import SOCKET_MSG from '../constants/wsEvents';
import { GameLobby } from './GameLobby';
import { User } from './GameLobby.types';
import getUser from './getUser';

// TODO: redirect to login if user is not logged in
const websocket = (_: any, res: any) => {
  if (!res.socket?.server.io) {
    const io = new Server(res.socket?.server);
    res.socket.server.io = io;

    const Lobby = new GameLobby(io);

    io.on('connection', (socket) => {
      socket.join('lobby');
      let user: User;

      socket.on(SOCKET_MSG.INITIALIZE, async () => {
        user = await getUser(socket.handshake.headers.cookie);
        io.to(socket.id).emit(SOCKET_MSG.INITIALIZE, user);
      });

      socket.on(SOCKET_MSG.HOST_GAME, (lobbyName) => {
        Lobby.open(lobbyName, user);
      });

      socket.on('disconnect', () => {
        Lobby.leaveAll(user);
      });
    });
  }

  res.end();
};

export default websocket;
