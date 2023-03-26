import { useMemo } from 'react';

import { DeckStatus } from 'types/graphql';

const DECK_STAUS = ['Active', 'Draft', 'Archived'];

interface DeckType {
  status: DeckStatus;
}

const useGroupByDeckType = (decks: DeckType[], filterEmpty = false) => {
  const decksByType = useMemo(() => {
    return DECK_STAUS.map((status) => {
      return {
        status: status as DeckStatus,
        decks: decks?.filter((deck) => deck.status === status.toLowerCase()),
      };
    }).filter((deckType) => !filterEmpty || deckType.decks?.length > 0);
  }, [decks]);

  if (!decks) return [];

  return decksByType;
};

export default useGroupByDeckType;
