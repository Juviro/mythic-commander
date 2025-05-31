import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { LobbyDeck, OwnDeck, PreconDeck } from 'backend/lobby/GameLobby.types';
import useLocalStorage from 'hooks/useLocalStorage';

export interface DeckOptions {
  ownDecks: OwnDeck[];
  publicDecks: LobbyDeck[];
  preconDecks: PreconDeck[];
}

export interface InitialDeck {
  deckId: string;
  // single id or comma separated ids
  commanderId?: string;
}

const getDecks = async () => {
  const res = await fetch('/api/decks');
  return res.json();
};

const useDeckSelection = (
  playerId: string,
  canSelectDeck: boolean,
  onSelectDeck: (deck: LobbyDeck) => void
) => {
  const [initialDeck, setInitialDeck] = useLocalStorage<InitialDeck>(
    'initial-deck-with-commanders'
  );

  const { data, isLoading } = useQuery<DeckOptions>(`decks-${playerId}`, getDecks, {
    enabled: canSelectDeck,
    refetchInterval: Infinity,
    staleTime: 5000,
  });

  const onSubmitSelection = (deckId: string, commanderIds?: string[]) => {
    const allDecks: LobbyDeck[] | OwnDeck[] | undefined = data?.publicDecks
      .concat(data?.ownDecks)
      .concat(data?.preconDecks);

    const selectedDeck = allDecks?.find((d) => d.id === deckId);

    if (!selectedDeck) return;

    onSelectDeck({ ...selectedDeck, commanderIds });
  };

  const onSelect = (deckId: string) => {
    setInitialDeck({ deckId });
    onSubmitSelection(deckId);
  };

  useEffect(() => {
    if (!data) return;

    const commanderIds = initialDeck?.commanderId?.split(',');
    onSubmitSelection(initialDeck?.deckId, commanderIds);
  }, [Boolean(data)]);

  return {
    ...data,
    isLoading,
    onSelect,
  };
};

export default useDeckSelection;
