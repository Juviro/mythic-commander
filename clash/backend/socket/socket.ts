import { Server } from 'socket.io';
import lobbySocketActions from 'backend/lobby/lobbySocketActions';
import gameSocketActions from 'backend/game/gameSocketActions';

const lobbysocket = (_: any, res: any) => {
  if (res.socket?.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket?.server);
  res.socket.server.io = io;

  lobbySocketActions(io);
  gameSocketActions(io);

  res.end();
};

export default lobbysocket;
