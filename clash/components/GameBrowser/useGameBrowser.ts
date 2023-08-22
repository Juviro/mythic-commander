import { useContext, useEffect, useState } from 'react';
import { SOCKET_MSG_BROWSER } from '../../constants/wsEvents';
import SocketContext from '../../contexts/SocketProvider';
import { Lobby } from '../../backend/websocket/GameLobby.types';
import { GameOptions } from '../../types/api.types';

const useGameBrowser = () => {
  const { user, emit, socket } = useContext(SocketContext);

  const [openLobbies, setOpenLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, (msg) => {
      setOpenLobbies(msg);
    });
  }, [socket]);

  const onHostLobby = (gameOptions: GameOptions) => {
    emit(SOCKET_MSG_BROWSER.HOST_LOBBY, JSON.stringify(gameOptions));
  };

  const onJoinLobby = (id: string) => {
    emit(SOCKET_MSG_BROWSER.JOIN_LOBBY, id);
  };

  const currentLobby = openLobbies.find((lobby) =>
    lobby.players.some((player) => player.id === user?.id)
  );

  const onLeaveLobby = () => {
    if (!currentLobby) return;
    emit(SOCKET_MSG_BROWSER.LEAVE_LOBBY, currentLobby.id);
  };

  return {
    openLobbies,
    currentLobby,
    user,
    onHostLobby,
    onJoinLobby,
    onLeaveLobby,
  };
};

export default useGameBrowser;
