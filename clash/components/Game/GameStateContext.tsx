import React, { CSSProperties, useContext, useEffect, useMemo, useState } from 'react';

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
        if (newLogEntry.overwritesPreviousLog) {
          return {
            ...prev,
            gameLog: [...prev.gameLog.slice(0, -1), newLogEntry],
          };
        }
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

    return {
      gameState: {
        ...gameState,
        // TODO: remove at some point - currently used to easily debug 4 players
        // players: [...gameState.players, gameState.players.at(-1)!],
      },
      player,
      isInitialized: true,
      getPlayerColor,
    };
  }, [gameState]);

  const globalCssStyle = useMemo<CSSProperties>(() => {
    if (!gameState?.players.length) return {};
    return gameState.players.reduce(
      (acc, currentPlayer) => ({
        ...acc,
        [`--color-player-${currentPlayer.id}`]: currentPlayer.color,
      }),
      {}
    );
  }, [gameState?.players.length]);

  return (
    <GameStateContext.Provider value={value}>
      <div style={globalCssStyle}>{children}</div>
    </GameStateContext.Provider>
  );
};

export default GameStateContext;
