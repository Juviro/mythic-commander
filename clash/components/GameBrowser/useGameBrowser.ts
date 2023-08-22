import { useContext, useEffect, useState } from 'react';
import SOCKET_MSG from '../../constants/wsEvents';
import SocketContext from '../../contexts/SocketProvider';
import { Lobby } from '../../backend/websocket/GameLobby.types';
import { GameOptions } from '../../types/api.types';

const useGameBrowser = () => {
  const { user, emit, socket } = useContext(SocketContext);

  const [openLobbies, setOpenLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_MSG.UPDATE_LOBBIES, (msg) => {
      setOpenLobbies(msg);
    });
  }, [socket]);

  const onHostGame = (gameOptions: GameOptions) => {
    emit(SOCKET_MSG.HOST_GAME, JSON.stringify(gameOptions));
  };

  return {
    openLobbies,
    user,
    onHostGame,
  };
};

export default useGameBrowser;
