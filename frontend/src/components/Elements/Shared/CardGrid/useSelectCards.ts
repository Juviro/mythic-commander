import { useEffect, useState } from 'react';
import { UnifiedCard } from 'types/unifiedTypes';

export const useSelectCards = (cards: UnifiedCard[]) => {
  const [selectedCardIds, setSelectedCardIds] = useState([]);

  const canSelectAll = selectedCardIds?.length !== cards?.length;

  const onSelectCard = (cardId: string) => {
    if (selectedCardIds.includes(cardId)) {
      setSelectedCardIds(selectedCardIds.filter((id) => id !== cardId));
    } else {
      setSelectedCardIds([...selectedCardIds, cardId]);
    }
  };

  const onClearSelection = () => {
    setSelectedCardIds([]);
  };

  const onSelectAll = () => {
    const allCardIds = cards.map(({ id }) => id);
    setSelectedCardIds(allCardIds);
  };

  // check for deleted cards to clear the selection after deleting cards
  useEffect(() => {
    if (!selectedCardIds.length) return;
    const newSelectedCardIds = selectedCardIds.filter((cardId) =>
      cards.some(({ id }) => id === cardId)
    );
    if (newSelectedCardIds.length === selectedCardIds.length) return;
    setSelectedCardIds(newSelectedCardIds);
    // eslint-disable-next-line
  }, [cards]);

  return {
    selectedCardIds,
    onSelectCard,
    onClearSelection,
    onSelectAll,
    canSelectAll,
  };
};
