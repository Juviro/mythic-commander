import React from 'react';

import getCardsByTag from 'utils/getCardsByTag';
import { tagColors } from 'constants/colors';
import getCardsByType from '../../../../utils/getCardsByType';
import CardLists from './CardLists';
import { sortByCmc, sortByName } from '../../../../utils/cardFilter';
import { Dropzone } from '../../../Elements/Desktop';

const getTagColor = (tag) => {
  if (tag === 'Untagged') return null;
  const { hex } =
    tagColors.find(({ name }) => name === tag) ?? tagColors[tagColors.length - 1];
  return hex;
};

export default ({ deck, loading, onAddCards, view }) => {
  const getCards = () => {
    if (!deck) return null;
    const sortedCards = sortByCmc(sortByName(deck.cards));

    if (view === 'type') {
      const { cardsByType } = getCardsByType(sortedCards);

      return cardsByType;
    }

    const cardsByTag = getCardsByTag(sortedCards);

    return cardsByTag.map(({ type, ...rest }) => ({
      type,
      titleColor: getTagColor(type),
      ...rest,
    }));
  };

  const cardsByType = getCards();
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
