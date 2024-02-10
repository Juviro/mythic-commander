import React, { useEffect, useMemo, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';

import {
  SOCKET_MSG_GAME,
  SOCKET_MSG_GENERAL,
  SOCKET_MSG_LOBBY,
} from 'backend/constants/wsEvents';
import { User } from 'backend/database/getUser';

const SocketContext = React.createContext<{
  user: User | null;
  isReady: boolean;
  emit: (event: string, payload?: string) => void;
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
  const router = useRouter();

  const ws = useRef<Socket | null>(null);

  const initSocket = async (gameId?: string) => {
    await fetch('/api/socket');
    const socket = io();
    ws.current = socket;

    const initializeMessage = gameId
      ? SOCKET_MSG_GAME.INITIALIZE
      : SOCKET_MSG_LOBBY.INITIALIZE;

    socket.on('connect', () => {
      socket.emit(initializeMessage, gameId);
    });

    socket.on(initializeMessage, (msg) => {
      setUser(msg);
    });

    socket.on(SOCKET_MSG_GENERAL.ERROR, (msg) => {
      // TODO: replace with a toast
      // eslint-disable-next-line no-alert
      alert(`Error: ${msg}`);
    });

    socket.on(SOCKET_MSG_GENERAL.NOT_LOGGED_IN, () => {
      const loginPath = `${process.env.NEXT_PUBLIC_MYTHIC_COMMANDER_URL}/login`;
      window.location.href = `${loginPath}?redirect=${window.location.href}`;
    });
  };

  useEffect(() => {
    if (!router.isReady) return undefined;
    const gameId = router.query.gameId as string | undefined;
    initSocket(gameId);

    return () => {
      ws.current?.disconnect();
    };
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isReady: Boolean(user),
      emit: (event: string, payload?: string) => {
        ws.current?.emit(event, payload);
      },
      socket: ws.current,
    }),
    [user]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketContext;
