import React from 'react';

import getCardsByTag from 'utils/getCardsByTag';
import { getTagColor } from 'utils/tags';
import getCardsByType from '../../../../utils/getCardsByType';
import getCardsByColor from '../../../../utils/getCardsByColor';
import CardLists from './CardLists';
import { sortByCmc, sortByName } from '../../../../utils/cardFilter';
import Dropzone from '../../../Elements/Desktop/Dropzone';

export default ({ deck, loading, onAddCards, view }) => {
  const numberOfModalDfcLands = deck?.cards?.filter(
    ({ isModalDfcLand }) => isModalDfcLand
  ).length;

  const getCards = () => {
    if (!deck) return null;
    const sortedCards = sortByCmc(sortByName(deck.cards));

    if (view === 'type') {
      const { cardsByType } = getCardsByType(sortedCards);

      return cardsByType;
    }

    if (view === 'color') {
      const { cardsByColor } = getCardsByColor(sortedCards);

      return cardsByColor;
    }

    const cardsByTag = getCardsByTag(sortedCards);

    return cardsByTag.map(({ type, ...rest }) => ({
      type,
      titleColor: getTagColor(type)?.fill,
      ...rest,
    }));
  };

  const cardsByType = getCards();
  const cardsByTypeWithoutEmpty = cardsByType?.filter(
    ({ cards, type }) => cards.length || type === 'Commander' || type === 'Lands'
  );

  const onDrop = ({ id, name, amount = 1 }) => {
    onAddCards([{ id, amount }], name);
  };

  return (
    <Dropzone onDrop={onDrop} listId={deck?.id}>
      <CardLists
        deck={deck}
        loading={loading}
        cardsByType={cardsByTypeWithoutEmpty}
        numberOfModalDfcLands={numberOfModalDfcLands}
      />
    </Dropzone>
  );
};
