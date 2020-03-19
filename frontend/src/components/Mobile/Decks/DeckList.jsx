import React from 'react';
import { withRouter } from 'react-router';
import { useMutation } from 'react-apollo';

import OverviewList from '../../Elements/OverviewList/OverviewList';
import { createDeck as createDeckMutation } from '../../../queries';

const DeckList = ({ decks, history }) => {
  const [mutate] = useMutation(createDeckMutation);
  const onOpenDeck = id => {
    history.push(`/m/decks/${id}`);
  };
  const onAddDeck = async () => {
    const { data } = await mutate();
    onOpenDeck(data.createDeck.id);
  };

  return (
    <OverviewList
      header="Your Decks"
      elements={decks}
      addElementText="Create Deck"
      onAddElement={onAddDeck}
      onClick={onOpenDeck}
    />
  );
};

export default withRouter(DeckList);
