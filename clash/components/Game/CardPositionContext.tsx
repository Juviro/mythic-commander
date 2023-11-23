import { Zone } from 'backend/database/gamestate.types';
import React, { PropsWithChildren, useMemo, useRef } from 'react';

export interface CardPosition {
  x: number;
  y: number;
  width: number;
  isVisible: boolean;
  zone?: Zone;
}

export interface CardPositions {
  current: { [key: string]: CardPosition | null };
}

interface CardPositionContextValue {
  cardPositions: CardPositions;
}

const CardPositionContext = React.createContext<CardPositionContextValue>(
  // @ts-ignore - this is a default value, it will be overwritten by the provider
  {}
);

export const CardPositionContextProvider = ({ children }: PropsWithChildren) => {
  const cardPositions = useRef<CardPositions['current']>({});

  const value = useMemo(() => {
    return { cardPositions };
  }, [cardPositions]);

  return (
    <CardPositionContext.Provider value={value}>{children}</CardPositionContext.Provider>
  );
};

export default CardPositionContext;
