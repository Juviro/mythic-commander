import React, { useContext, useEffect, useMemo, useState } from 'react';

import SocketContext from 'components/SocketContext/SocketContextProvider';
import { GameState, Player } from 'backend/database/gamestate.types';
import { GameLog } from 'backend/constants/logMessages';
import { SOCKET_MSG_GAME } from '../../backend/constants/wsEvents';

export interface InitializedGameState {
  gameState: GameState;
  player: Player;
  isInitialized: true;
}

interface LoadingGameState {
  gameState: null;
  player: null;
  isInitialized: false;
}

type GameStateContextType = InitializedGameState | LoadingGameState;

const GameStateContext = React.createContext<InitializedGameState | LoadingGameState>({
  gameState: null,
  player: null,
  isInitialized: false,
});

interface Props {
  children: React.ReactNode;
}

export const GameStateContextProvider = ({ children }: Props) => {
  const { socket } = useContext(SocketContext);
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_MSG_GAME.GAME_STATE, (msg: GameState) => {
      setGameState(msg);
    });

    socket.on(SOCKET_MSG_GAME.UPDATE_PLAYER, (player: Player) => {
      setGameState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          players: prev.players.map((p) => (p.id === player.id ? player : p)),
        };
      });
    });
    socket.on(SOCKET_MSG_GAME.GAME_LOG, (newLogEntry: GameLog) => {
      setGameState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          gameLog: [...prev.gameLog, newLogEntry],
        };
      });
    });
  }, [socket]);

  const player = gameState?.players.find(({ isSelf }) => isSelf);

  const value: GameStateContextType = useMemo(() => {
    if (!gameState || !player) {
      return { gameState: null, player: null, isInitialized: false };
    }

    return { gameState, player, isInitialized: true };
  }, [gameState]);

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
};

export default GameStateContext;
