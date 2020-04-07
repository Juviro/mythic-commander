import React from 'react';
import { withRouter } from 'react-router';
import { useMutation } from 'react-apollo';

import { OverviewList } from '../../Elements/Mobile';
import { createDeck as createDeckMutation, getDecks } from '../../../queries';

const DeckList = ({ decks, history }) => {
  const [mutate] = useMutation(createDeckMutation);
  const onOpenDeck = id => {
    history.push(`/m/decks/${id}`);
  };
  const onAddDeck = async () => {
    const { data: createDeck } = await mutate({
      update: (cache, { data }) => {
        const { createDeck: newDeck } = data;
        const existing = cache.readQuery({
          query: getDecks,
        });

        cache.writeQuery({
          query: getDecks,
          data: {
            decks: [...existing.decks, newDeck],
          },
        });
      },
    });
    onOpenDeck(createDeck.createDeck.id);
  };

  const sortedDecks = decks.sort(
    (a, b) => Number(b.lastEdit) - Number(a.lastEdit)
  );

  return (
    <OverviewList
      header="Your Decks"
      elements={sortedDecks}
      addElementText="Create Deck"
      onAddElement={onAddDeck}
      onClick={onOpenDeck}
    />
  );
};

export default withRouter(DeckList);
