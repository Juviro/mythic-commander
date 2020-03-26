import React from 'react';
import { useParams } from 'react-router';
import { Divider, Typography } from 'antd';
import FilteredCardList from '../../../Elements/CardList/FilteredCardList';
import { getNumberOfCards } from '../../../../utils/deck';

const typeMap = {
  Sorcery: 'Sorceries',
  Commander: 'Commander',
};

const typeToPlural = type => typeMap[type] || `${type}s`;

export default ({ cards, type, loading, onEditCard, onDeleteCard }) => {
  const { id } = useParams();
  if (!cards.length) return null;

  const numberOfCards = getNumberOfCards(cards);
  const nameSuffix = type !== 'Commander' ? ` (${numberOfCards})` : '';
  const title = typeToPlural(type) + nameSuffix;

  return (
    <>
      <Typography.Title level={4}>{title}</Typography.Title>
      <FilteredCardList
        cards={cards}
        loading={loading}
        onEditCard={onEditCard}
        onDeleteCard={onDeleteCard}
        hideFooter
        basePath={`/m/decks/${id}`}
      />
      <Divider style={{ margin: '16px 0' }} />
    </>
  );
};
