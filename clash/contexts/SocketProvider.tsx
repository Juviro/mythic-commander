import React, { useEffect, useMemo, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { SOCKET_MSG_BROWSER } from '../constants/wsEvents';
import { User } from '../backend/websocket/GameLobby.types';

const SocketContext = React.createContext<{
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

export const SocketContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const ws = useRef<Socket | null>(null);

  const initSocket = async () => {
    await fetch('/api/socket');
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

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketContext;
