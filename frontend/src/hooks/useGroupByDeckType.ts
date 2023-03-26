import { useMemo } from 'react';

const DECK_STAUS = ['Active', 'Draft', 'Archived'];

interface DeckType {
  status: 'active' | 'draft' | 'archived';
}

const useGroupByDeckType = (decks: DeckType[], filterEmpty = false) => {
  const decksByType = useMemo(() => {
    return DECK_STAUS.map((status) => {
      return {
        status,
        decks: decks?.filter((deck) => deck.status === status.toLowerCase()),
      };
    }).filter((deckType) => !filterEmpty || deckType.decks?.length > 0);
  }, [decks]);

  if (!decks) return [];

  return decksByType;
};

export default useGroupByDeckType;
