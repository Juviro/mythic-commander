import React, { PropsWithChildren, useMemo, useState } from 'react';

interface ContextValue {
  hoveredCardIds: string[];
  setHoveredCardIds: (ids: string[]) => void;
  selectedCardIds: string[];
  setSelectedCardsIds: (ids: string[]) => void;
}

// @ts-ignore
const BattlefieldSelectionContext = React.createContext<ContextValue>({});

type Props = PropsWithChildren;

export const BattlefieldSelectionContextProvider = ({ children }: Props) => {
  const [hoveredCardIds, setHoveredCardIds] = useState<string[]>([]);
  const [selectedCardIds, setSelectedCardsIds] = useState<string[]>([]);

  const value = useMemo(() => {
    return { hoveredCardIds, setHoveredCardIds, selectedCardIds, setSelectedCardsIds };
  }, [hoveredCardIds, selectedCardIds]);

  return (
    <BattlefieldSelectionContext.Provider value={value}>
      {children}
    </BattlefieldSelectionContext.Provider>
  );
};

export default BattlefieldSelectionContext;
