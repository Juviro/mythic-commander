import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Player, ZONES } from 'backend/database/gamestate.types';
import useClickedOutside from 'hooks/useClickedOutside';
import useShortcut from 'hooks/useShortcut';
import SHORTCUTS from 'constants/shortcuts';
import useCardActions from 'components/GameComponents/Card/cardActions/useCardActions';

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

  const { tapCards, flipCards } = useCardActions({
    cardIds: selectedCardIds,
    battlefieldPlayerId: player.id,
    zone: ZONES.BATTLEFIELD,
  });

  const disabled = !selectedCardIds.length;

  useShortcut(SHORTCUTS.TAP, tapCards, {
    disabled,
  });

  useShortcut(SHORTCUTS.FLIP, flipCards, {
    disabled,
  });

  useShortcut(SHORTCUTS.CANCEL, () => setSelectedCardsIds([]), {
    disabled,
  });

  useClickedOutside(selectionRectangleRef, () => setSelectedCardsIds([]), {
    disabled,
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
