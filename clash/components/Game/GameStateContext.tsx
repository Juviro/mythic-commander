import React, { CSSProperties, useContext, useEffect, useMemo, useState } from 'react';

import SocketContext from 'components/SocketContext/SocketContextProvider';
import { GameState, Player, VisibleCard, Zone } from 'backend/database/gamestate.types';
import { GameLog } from 'backend/constants/logMessages';
import { SOCKET_MSG_GAME } from '../../backend/constants/wsEvents';

interface PeekingCards {
  zone: Zone;
  playerId: string;
  cards: VisibleCard[];
  isSearch?: boolean;
}
interface BaseGameState {
  getPlayerColor: (playerId?: string) => string | undefined;
  playerNames: { [key: string]: string };
  peekingCards: PeekingCards | null;
  setPeekingCards: (peekingCards: PeekingCards | null) => void;
  battlefieldCardWidth: number;
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

// @ts-ignore
const GameStateContext = React.createContext<InitializedGameState | LoadingGameState>();

interface Props {
  children: React.ReactNode;
}

export const GameStateContextProvider = ({ children }: Props) => {
  const { socket, user } = useContext(SocketContext);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [peekingCards, setPeekingCards] = useState<PeekingCards | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_MSG_GAME.GAME_STATE, (msg: GameState) => {
      setGameState((prev) => ({
        ...prev,
        ...msg,
      }));
      setPeekingCards(null);
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
    socket.on(SOCKET_MSG_GAME.PEEK, (peek: PeekingCards) => {
      setPeekingCards(peek);
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

  const battlefieldCardWidth = useMemo(() => {
    if (!gameState?.players.length) return 0;
    const aspectRatio = 301 / 419;
    const cardWidth = (window.innerHeight / 10) * aspectRatio;
    if (gameState.players.length === 1) return cardWidth * 2;
    return cardWidth;
  }, [gameState?.players.length]);

  const playerNames: { [key: string]: string } =
    gameState?.players.reduce(
      (acc, currentPlayer) => ({
        ...acc,
        [currentPlayer.id]: currentPlayer.name,
      }),
      {}
    ) ?? {};

  const value: GameStateContextType = useMemo(() => {
    const baseState = {
      getPlayerColor,
      playerNames,
      peekingCards,
      setPeekingCards,
      battlefieldCardWidth,
    };
    if (!gameState || !player) {
      return {
        ...baseState,
        gameState: null,
        player: null,
        isInitialized: false,
      };
    }

    return {
      ...baseState,
      gameState: {
        ...gameState,
        // TODO: remove at some point - currently used to easily debug 4 players
        // players: [...gameState.players, gameState.players.at(-1)!],
      },
      player,
      isInitialized: true,
    };
  }, [gameState, peekingCards]);

  const globalCssStyle = useMemo<CSSProperties>(() => {
    if (!gameState?.players.length) return {};
    const playerColors = gameState.players.reduce(
      (acc, currentPlayer) => ({
        ...acc,
        [`--color-player-${currentPlayer.id}`]: currentPlayer.color,
      }),
      {}
    );

    return {
      '--battlefield-card-width': `${battlefieldCardWidth}px`,
      ...playerColors,
    };
  }, [gameState?.players.length]);

  return (
    <GameStateContext.Provider value={value}>
      <div style={globalCssStyle}>{children}</div>
    </GameStateContext.Provider>
  );
};

export default GameStateContext;
