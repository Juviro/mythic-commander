import React from 'react';
import { withRouter } from 'react-router';

import { Divider } from 'antd';
import Flex from '../../Flex';
import AddToCollection from './AddToCollection';
import List from './List';

const Lists = ({
  data,
  onAddToDeck,
  onAddToWantsList,
  onAddToCollection,
  history,
  cardsToAdd,
}) => {
  const { wantsLists, decks } = data.allLists;
  const wantsWithImg = wantsLists.map(({ deck, ...rest }) => ({
    ...deck,
    ...rest,
  }));

  // check where we are to decide which options to show
  const match = history.location.pathname.match(/^\/(wants|decks|search)+/);
  const [, type, currentId] = match || [];

  const shouldFilterWants = type === 'wants';
  const filteredWants = shouldFilterWants
    ? wantsWithImg.filter(({ id }) => id !== currentId)
    : wantsWithImg;

  const shouldFilterDecks = type === 'decks';
  const filteredDecks = shouldFilterDecks
    ? decks.filter(({ id }) => id !== currentId)
    : decks;

  return (
    <Flex direction="column">
      {type && (
        <AddToCollection onAddToCollection={onAddToCollection} cardsToAdd={cardsToAdd} />
      )}
      <Divider>Add to a list</Divider>
      <List title="Deck" elements={filteredDecks} onClick={onAddToDeck} />
      <List title="Wants List" elements={filteredWants} onClick={onAddToWantsList} />
    </Flex>
  );
};

export default withRouter(Lists);
