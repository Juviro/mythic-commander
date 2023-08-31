import React, { useContext, useEffect, useMemo, useState } from 'react';

import SocketContext from 'components/SocketContext/SocketContextProvider';
import { GameState, Player } from 'backend/database/gamestate.types';
import { GameLog } from 'backend/constants/logMessages';
import { SOCKET_MSG_GAME } from '../../backend/constants/wsEvents';

interface BaseGameState {
  getPlayerColor: (playerId?: string) => string | undefined;
}
export interface InitializedGameState extends BaseGameState {
  gameState: GameState;
  player: Player;
  isInitialized: true;
}

interface LoadingGameState extends BaseGameState {
  gameState: null;
  player: null;
  isInitialized: false;
}

type GameStateContextType = InitializedGameState | LoadingGameState;

const GameStateContext = React.createContext<InitializedGameState | LoadingGameState>({
  gameState: null,
  player: null,
  isInitialized: false,
  getPlayerColor: () => undefined,
});

interface Props {
  children: React.ReactNode;
}

export const GameStateContextProvider = ({ children }: Props) => {
  const { socket, user } = useContext(SocketContext);
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

  const getPlayerColor = (playerId?: string) => {
    const player = gameState?.players.find(({ id }) => id === playerId);
    return player?.color;
  };

  const player = gameState?.players.find(({ id }) => id === user?.id);

  const value: GameStateContextType = useMemo(() => {
    if (!gameState || !player) {
      return { gameState: null, player: null, isInitialized: false, getPlayerColor };
    }

    return { gameState, player, isInitialized: true, getPlayerColor };
  }, [gameState]);

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
};

export default GameStateContext;
