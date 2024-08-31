import { BattlefieldCard, VisibleCard, Zone } from 'backend/database/gamestate.types';
import React, { PropsWithChildren, useMemo, useRef, useState } from 'react';

export interface CardPosition {
  x: number;
  y: number;
  width: number;
  isVisible: boolean;
  zone?: Zone;
  tapped?: boolean;
}

export interface HoveredBattlefield {
  playerId: string;
  element: HTMLDivElement;
}

export interface CardPositions {
  current: { [key: string]: CardPosition | null };
}

export interface SnapChoords {
  x?: number | null;
  y?: number | null;
  groupX?: number;
  groupY?: number;
  placeBehindOthers?: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface CardPositionContextValue {
  cardPositions: CardPositions;
  hoveredBattlefield: {
    current: HoveredBattlefield | null;
  };
  snapChoords: {
    current: SnapChoords;
  };
  hoveredCard: VisibleCard | BattlefieldCard | null;
  contextMenuPosition: {
    current: Point | null;
  };
  setHoveredCard: React.Dispatch<
    React.SetStateAction<VisibleCard | BattlefieldCard | null>
  >;
}

const CardPositionContext = React.createContext<CardPositionContextValue>(
  // @ts-ignore - this context always needs to be available
  // and should therefore crash if it's not
  {}
);

export const CardPositionContextProvider = ({ children }: PropsWithChildren) => {
  const cardPositions = useRef<CardPositions['current']>({});
  const hoveredBattlefield = useRef<HoveredBattlefield | null>(null);
  const snapChoords = useRef<SnapChoords>({ x: null, y: null });
  const contextMenuPosition = useRef<Point | null>(null);
  const [hoveredCard, setHoveredCard] = useState<VisibleCard | BattlefieldCard | null>(
    null
  );

  const value = useMemo(() => {
    return {
      cardPositions,
      hoveredBattlefield,
      snapChoords,
      hoveredCard,
      setHoveredCard,
      contextMenuPosition,
    };
  }, [hoveredCard]);

  return (
    <CardPositionContext.Provider value={value}>{children}</CardPositionContext.Provider>
  );
};

export default CardPositionContext;
