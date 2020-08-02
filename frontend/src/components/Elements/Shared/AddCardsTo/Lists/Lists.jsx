import React from 'react';
import { useParams } from 'react-router';

import List from './List';
import Flex from '../../Flex';
import ListTitle from './ListTitle';
import { TYPES } from '../../../../../constants/types';

export default ({ data, type, onAddCards, onBack }) => {
  const { id: currentId } = useParams();
  const { wantsLists, decks } = data?.allLists ?? {};
  const wantsWithImg = wantsLists.map(({ deck, ...rest }) => ({
    ...deck,
    ...rest,
  }));

  const filteredWants = wantsWithImg.filter(({ id }) => id !== currentId);
  const filteredDecks = decks.filter(({ id }) => id !== currentId);

  const titleMap = {
    [TYPES.DECK]: 'Decks',
    [TYPES.WANTS]: 'Wants Lists',
  };
  const title = titleMap[type];

  return (
    <Flex direction="column">
      <ListTitle title={title} onBack={onBack} />
      {type === TYPES.DECK && <List elements={filteredDecks} onClick={onAddCards} />}
      {type === TYPES.WANTS && <List elements={filteredWants} onClick={onAddCards} />}
    </Flex>
  );
};
