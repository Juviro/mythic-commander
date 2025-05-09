import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { LobbyDeck, OwnDeck, PreconDeck } from 'backend/lobby/GameLobby.types';
import useLocalStorage from 'hooks/useLocalStorage';

export interface DeckOptions {
  ownDecks: OwnDeck[];
  publicDecks: LobbyDeck[];
  preconDecks: PreconDeck[];
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
  const [initialDeckId, setInitialDeckId] = useLocalStorage<string>('initial-deck');

  const { data, isLoading } = useQuery<DeckOptions>(`decks-${playerId}`, getDecks, {
    enabled: canSelectDeck,
    refetchInterval: Infinity,
    staleTime: Infinity,
  });

  const onSubmitSelection = (deckId: string) => {
    const allDecks: LobbyDeck[] | OwnDeck[] | undefined = data?.publicDecks
      .concat(data?.ownDecks)
      .concat(data?.preconDecks);
    const selectedDeck = allDecks?.find((d) => d.id === deckId);

    if (!selectedDeck) return;

    if (!selectedDeck) return;

    onSelectDeck(selectedDeck);
  };

  const onSelect = (deckId: string) => {
    setInitialDeckId(deckId);
    onSubmitSelection(deckId);
  };

  useEffect(() => {
    if (!data) return;

    onSubmitSelection(initialDeckId);
  }, [Boolean(data)]);

  return {
    ...data,
    isLoading,
    onSelect,
  };
};

export default useDeckSelection;
