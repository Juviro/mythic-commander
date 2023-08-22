import { useContext, useEffect, useState } from 'react';
import SOCKET_MSG from '../../constants/wsEvents';
import SocketContext from '../../contexts/SocketProvider';
import { Lobby } from '../../backend/websocket/GameLobby.types';

const useGameBrowser = () => {
  const { user, emit, socket } = useContext(SocketContext);

  const [openLobbies, setOpenLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_MSG.UPDATE_LOBBIES, (msg) => {
      setOpenLobbies(msg);
    });
  }, [socket]);

  const onHostGame = (name: string) => {
    emit(SOCKET_MSG.HOST_GAME, name);
  };

  return {
    openLobbies,
    user,
    onHostGame,
  };
};

export default useGameBrowser;
