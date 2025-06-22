import { useEffect, useState } from 'react';
import { GridCard as GridCardType } from './cardgrid.types';

interface Props {
  cards: GridCardType[];
  initialSelection: string[];
  onSelectCards: (cardIds: string[]) => void;
}

export const useSelectCards = ({
  cards,
  initialSelection = [],
  onSelectCards,
}: Props) => {
  const [selectedCardIds, setSelectedCardIds] = useState(initialSelection);

  const canSelectAll = selectedCardIds?.length !== cards?.length;

  const onSelectCard = (cardId: string) => {
    let newSelectedCardIds = [...selectedCardIds];
    if (selectedCardIds.includes(cardId)) {
      newSelectedCardIds = selectedCardIds.filter((id) => id !== cardId);
    } else {
      newSelectedCardIds = [...selectedCardIds, cardId];
    }
    setSelectedCardIds(newSelectedCardIds);
    onSelectCards?.(newSelectedCardIds);
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
