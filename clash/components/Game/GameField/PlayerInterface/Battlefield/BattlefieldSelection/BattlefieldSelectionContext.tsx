import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Player } from 'backend/database/gamestate.types';
import useClickedOutside from 'hooks/useClickedOutside';

interface ContextValue {
  hoveredCardIds: string[];
  setHoveredCardIds: (ids: string[]) => void;
  selectedCardIds: string[];
  setSelectedCardsIds: (ids: string[]) => void;
  toggleCardSelection: (id: string) => void;
  selectionRectangleRef: RefObject<HTMLDivElement>;
}

// @ts-ignore
const BattlefieldSelectionContext = React.createContext<ContextValue>({});

interface Props extends PropsWithChildren {
  player: Player;
}

export const BattlefieldSelectionContextProvider = ({ children, player }: Props) => {
  const selectionRectangleRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIds, setHoveredCardIds] = useState<string[]>([]);
  const [selectedCardIds, setSelectedCardsIds] = useState<string[]>([]);

  useClickedOutside(selectionRectangleRef, () => setSelectedCardsIds([]), {
    disabled: !selectedCardIds.length,
  });

  const battlefieldCards = player.zones.battlefield;

  useEffect(() => {
    const newSelectedCardIds = selectedCardIds.filter((id) => {
      return battlefieldCards.some((card) => card.clashId === id);
    });

    if (newSelectedCardIds.length === selectedCardIds.length) return;
    setSelectedCardsIds(newSelectedCardIds);
  }, [battlefieldCards]);

  const toggleCardSelection = (id: string) => {
    if (selectedCardIds.includes(id)) {
      setSelectedCardsIds(selectedCardIds.filter((cardId) => cardId !== id));
    } else {
      setSelectedCardsIds([...selectedCardIds, id]);
    }
  };

  const value = useMemo(() => {
    return {
      hoveredCardIds,
      setHoveredCardIds,
      selectedCardIds,
      setSelectedCardsIds,
      selectionRectangleRef,
      toggleCardSelection,
    };
  }, [hoveredCardIds, selectedCardIds]);

  return (
    <BattlefieldSelectionContext.Provider value={value}>
      {children}
    </BattlefieldSelectionContext.Provider>
  );
};

export default BattlefieldSelectionContext;
