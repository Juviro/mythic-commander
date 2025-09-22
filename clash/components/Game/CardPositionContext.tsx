import { AttachedCard } from 'backend/constants/wsEvents';
import {
  ActivePlane,
  BattlefieldCard,
  VisibleCard,
  Zone,
} from 'backend/database/gamestate.types';
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
  attachTo?: AttachedCard;
}

interface Point {
  x: number;
  y: number;
}

type HoveredCard = VisibleCard | BattlefieldCard | ActivePlane | null;

interface CardPositionContextValue {
  cardPositions: CardPositions;
  hoveredBattlefield: {
    current: HoveredBattlefield | null;
  };
  snapChoords: {
    current: SnapChoords;
  };
  contextMenuPosition: {
    current: Point | null;
  };
  hoveredCard: HoveredCard;
  setHoveredCard: React.Dispatch<React.SetStateAction<HoveredCard>>;
  rulesCardId: string | null;
  setRulesCardId: React.Dispatch<React.SetStateAction<string | null>>;
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

  const [hoveredCard, setHoveredCard] = useState<HoveredCard>(null);
  const [rulesCardId, setRulesCardId] = useState<string | null>(null);

  const value = useMemo(() => {
    return {
      cardPositions,
      hoveredBattlefield,
      snapChoords,
      hoveredCard,
      setHoveredCard,
      rulesCardId,
      setRulesCardId,
      contextMenuPosition,
    };
  }, [hoveredCard, rulesCardId]);

  return (
    <CardPositionContext.Provider value={value}>{children}</CardPositionContext.Provider>
  );
};

export default CardPositionContext;
