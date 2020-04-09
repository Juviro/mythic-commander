import React from 'react';
import { Divider, Typography } from 'antd';
import { FilteredCardList } from '../../../Elements/Mobile';
import { getNumberOfCards } from '../../../../utils/deck';

const typeMap = {
  Sorcery: 'Sorceries',
  Commander: 'Commander',
};

const typeToPlural = type => typeMap[type] || `${type}s`;

export default ({ cards, type, onEditCard, onDeleteCard, moveToList }) => {
  if (!cards.length) return null;

  const numberOfCards = getNumberOfCards(cards);
  const nameSuffix = type !== 'Commander' ? `12` : '1';
  const title = `${typeToPlural(type)} ${nameSuffix}`;

  return (
    <>
      <Typography.Title level={4}>{title}</Typography.Title>
      <FilteredCardList
        cards={cards}
        moveToList={moveToList}
        onEditCard={onEditCard}
        onDeleteCard={onDeleteCard}
        hideFooter
      />
      <Divider style={{ margin: '16px 0' }} />
    </>
  );
};
