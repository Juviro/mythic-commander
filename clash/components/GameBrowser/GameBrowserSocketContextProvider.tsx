import React, { useEffect, useMemo, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { User } from 'backend/websocket/GameLobby.types';
import { SOCKET_MSG_BROWSER } from 'constants/wsEvents';

const GameBrowserSocketContext = React.createContext<{
  user: User | null;
  isReady: boolean;
  emit: (event: string, payload: string) => void;
  socket: Socket | null;
}>({
  user: null,
  isReady: false,
  emit: () => null,
  socket: null,
});

interface Props {
  children: React.ReactNode;
}

export const GameBrowserSocketContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const ws = useRef<Socket | null>(null);

  const initSocket = async () => {
    await fetch('/api/lobby-socket');
    const socket = io();
    ws.current = socket;

    socket.on('connect', () => {
      socket.emit(SOCKET_MSG_BROWSER.INITIALIZE);
    });

    socket.on(SOCKET_MSG_BROWSER.INITIALIZE, (msg) => {
      setUser(msg);
    });

    socket.on(SOCKET_MSG_BROWSER.NOT_LOGGED_IN, () => {
      const loginPath = process.env.NEXT_PUBLIC_LOGIN_URL;
      window.location.href = `${loginPath}?redirect=${window.location.href}`;
    });
  };

  useEffect(() => {
    initSocket();

    return () => {
      ws.current?.disconnect();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isReady: Boolean(user),
      emit: (event: string, payload: string) => {
        ws.current?.emit(event, payload);
      },
      socket: ws.current,
    }),
    [user]
  );

  return (
    <GameBrowserSocketContext.Provider value={value}>
      {children}
    </GameBrowserSocketContext.Provider>
  );
};

export default GameBrowserSocketContext;
