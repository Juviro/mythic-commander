import React, { CSSProperties, useContext, useEffect, useMemo, useState } from 'react';

import SocketContext from 'components/SocketContext/SocketContextProvider';
import {
  GameState,
  Phase,
  Player,
  VisibleCard,
  Zone,
} from 'backend/database/gamestate.types';
import { GameLog } from 'backend/constants/logMessages';
import { SOCKET_MSG_GAME } from '../../backend/constants/wsEvents';

export const CARD_ASPECT_RATIO = 301 / 419;
interface PeekingCards {
  zone: Zone;
  playerId: string;
  cards: VisibleCard[];
  isSearch?: boolean;
}
interface BaseGameState {
  getPlayerColor: (playerId?: string, opacity?: number) => string | undefined;
  playerNames: { [key: string]: string };
  peekingCards: PeekingCards | null;
  setPeekingCards: (peekingCards: PeekingCards | null) => void;
  battlefieldCardWidth: number;
  battlefieldCardHeight: number;
  stopPoint: Phase | null;
  globalCssStyle: CSSProperties;
}
export interface InitializedGameState extends BaseGameState {
  gameState: GameState;
  /**
   * The player object of the current user
   * */
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
  const [stopPoint, setStopPoint] = useState<Phase | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_MSG_GAME.GAME_STATE, (msg: GameState) => {
      setGameState((prev) => ({
        ...prev,
        ...msg,
      }));
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

    socket.on(SOCKET_MSG_GAME.SET_STOP_POINT, ({ phase }: { phase: Phase }) => {
      setStopPoint(phase);
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

  const getPlayerColor = (playerId?: string, opacity?: number) => {
    const player = gameState?.players.find(({ id }) => id === playerId);
    if (!opacity) return player?.color;

    const opacityInHex = Math.round(Math.max(0, Math.min(1, opacity)) * 255)
      .toString(16)
      .padStart(2, '0');
    return `${player?.color}${opacityInHex}`;
  };

  const player = gameState?.players.find(({ id }) => id === user?.id);

  const hasUnacceptedMulligan = player?.mulligan?.cardsAccepted === false;

  useEffect(() => {
    if (!hasUnacceptedMulligan) return;
    setStopPoint(null);
  }, [hasUnacceptedMulligan]);

  const battlefieldCardWidth = useMemo(() => {
    if (!gameState?.players.length) return 0;

    const cardWidth = (window.innerHeight / 10) * CARD_ASPECT_RATIO;
    if (gameState.players.length === 1) return cardWidth * 1.5;
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

  const value: GameStateContextType = useMemo(() => {
    const baseState = {
      globalCssStyle,
      getPlayerColor,
      stopPoint,
      playerNames,
      peekingCards,
      setPeekingCards,
      battlefieldCardWidth,
      battlefieldCardHeight: battlefieldCardWidth / CARD_ASPECT_RATIO,
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
      gameState,
      player,
      isInitialized: true,
    };
  }, [gameState, peekingCards, stopPoint]);

  return (
    <GameStateContext.Provider value={value}>
      <div style={globalCssStyle}>{children}</div>
    </GameStateContext.Provider>
  );
};

export default GameStateContext;
