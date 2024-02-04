import { Server } from 'socket.io';
import lobbySocketActions from 'backend/lobby/lobbySocketActions';
import gameSocketActions from 'backend/game/gameSocketActions';

const lobbysocket = (_: any, res: any) => {
  // eslint-disable-next-line no-console
  console.log('res.socket?.server.io', res.socket?.server.io);
  if (res.socket?.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket?.server);
  res.socket.server.io = io;
  // eslint-disable-next-line no-console
  console.log('io', io);

  lobbySocketActions(io);
  gameSocketActions(io);

  res.end();
};

export default lobbysocket;
