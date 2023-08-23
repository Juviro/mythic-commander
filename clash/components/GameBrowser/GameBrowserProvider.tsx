import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Deck, GameOptions, Lobby, User } from 'backend/websocket/GameLobby.types';
import SocketContext from '../../contexts/SocketProvider';
import { SOCKET_MSG_BROWSER } from '../../constants/wsEvents';

const GameBrowserContext = React.createContext<{
  openLobbies: Lobby[];
  currentLobby?: Lobby;
  user: User | null;
  onHostLobby: (gameOptions: GameOptions) => void;
  onJoinLobby: (id: string) => void;
  onLeaveLobby: () => void;
  onSelectDeck: (deck: Deck) => void;
  onReady: (isReady: boolean) => void;
}>({
  openLobbies: [],
  user: null,
  /* eslint-disable @typescript-eslint/no-empty-function */
  onHostLobby: () => {},
  onJoinLobby: () => {},
  onLeaveLobby: () => {},
  onSelectDeck: () => {},
  onReady: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
});

interface Props {
  children: React.ReactNode;
}

export const GameBrowserContextProvider = ({ children }: Props) => {
  const { user, emit, socket } = useContext(SocketContext);

  const [openLobbies, setOpenLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_MSG_BROWSER.UPDATE_LOBBIES, (msg: Lobby[]) => {
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

  const onSelectDeck = (deck: Deck) => {
    if (!currentLobby) return;

    emit(SOCKET_MSG_BROWSER.SELECT_DECK, JSON.stringify(deck));
  };

  const onReady = (isReady: boolean) => {
    if (!currentLobby) return;

    emit(SOCKET_MSG_BROWSER.READY, isReady.toString());
  };

  const value = useMemo(
    () => ({
      openLobbies,
      currentLobby,
      user,
      onHostLobby,
      onJoinLobby,
      onLeaveLobby,
      onSelectDeck,
      onReady,
    }),
    [
      openLobbies,
      currentLobby,
      user,
      onHostLobby,
      onJoinLobby,
      onLeaveLobby,
      onSelectDeck,
      onReady,
    ]
  );

  return (
    <GameBrowserContext.Provider value={value}>{children}</GameBrowserContext.Provider>
  );
};

export default GameBrowserContext;
