import React from 'react';

import getCardsByType from '../../../../utils/getCardsByType';
import CardLists from './CardLists';
import { sortByCmc, sortByName } from '../../../../utils/cardFilter';
import { Dropzone } from '../../../Elements/Desktop';

export default ({ deck, loading, onAddCards }) => {
  const sortedCards = deck && sortByCmc(sortByName(deck.cards));
  const cardsByType = deck && getCardsByType(sortedCards).cardsByType;
  const cardsByTypeWithoutEmpty = cardsByType?.filter(
    ({ cards, type }) => cards.length || type === 'Commander'
  );

  const onDrop = ({ id, name, amount = 1 }) => {
    onAddCards([{ id, amount }], name);
  };

  return (
    <Dropzone onDrop={onDrop} listId={deck?.id}>
      <CardLists deck={deck} loading={loading} cardsByType={cardsByTypeWithoutEmpty} />
    </Dropzone>
  );
};
