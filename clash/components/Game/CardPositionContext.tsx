import { Zone } from 'backend/database/gamestate.types';
import React, { PropsWithChildren, useMemo, useRef } from 'react';

export interface CardPosition {
  x: number;
  y: number;
  width: number;
  isVisible: boolean;
  zone?: Zone;
}

export interface HoveredBattlefield {
  playerId: string;
  element: HTMLDivElement;
}

export interface CardPositions {
  current: { [key: string]: CardPosition | null };
}

export interface SnapChoords {
  x: number | null;
  y: number | null;
}

interface CardPositionContextValue {
  cardPositions: CardPositions;
  hoveredBattlefield: {
    current: HoveredBattlefield | null;
  };
  snapChoords: {
    current: SnapChoords;
  };
}

const CardPositionContext = React.createContext<CardPositionContextValue>(
  // @ts-ignore - this is a default value, it will be overwritten by the provider
  {}
);

export const CardPositionContextProvider = ({ children }: PropsWithChildren) => {
  const cardPositions = useRef<CardPositions['current']>({});
  const hoveredBattlefield = useRef<HoveredBattlefield | null>(null);
  const snapChoords = useRef<SnapChoords>({ x: null, y: null });

  const value = useMemo(() => {
    return { cardPositions, hoveredBattlefield, snapChoords };
  }, []);

  return (
    <CardPositionContext.Provider value={value}>{children}</CardPositionContext.Provider>
  );
};

export default CardPositionContext;
