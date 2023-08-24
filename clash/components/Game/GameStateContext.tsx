import React, { useContext, useEffect, useMemo, useState } from 'react';

import SocketContext from 'components/SocketContext/SocketContextProvider';
import { GameState } from 'backend/database/gamestate.types';
import { SOCKET_MSG_GAME } from '../../backend/constants/wsEvents';

const GameStateContext = React.createContext<{
  gameState: GameState | null;
}>({
  gameState: null,
});

interface Props {
  children: React.ReactNode;
}

export const GameStateContextProvider = ({ children }: Props) => {
  const { socket } = useContext(SocketContext);
  const [gameState, setGameState] = useState<GameState | null>(null);
  console.log('gameState', gameState);

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_MSG_GAME.GAME_STATE, (msg: GameState) => {
      setGameState(msg);
    });
  }, [socket]);

  const value = useMemo(
    () => ({
      gameState,
    }),
    [gameState]
  );

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
};

export default GameStateContext;
