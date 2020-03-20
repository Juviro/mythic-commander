import React from 'react';
import { List } from 'antd';
import SublistHeader from './SublistHeader';
import Card from './Card';
import { getNumberOfCards } from '../../../../../utils/deck';

export default ({
  deck,
  cards,
  type,
  commander,
  openCardId,
  setOpenCardId,
}) => {
  if (!cards || !cards.length) return null;
  const dataSource = cards.sort((a, b) => (a.name < b.name ? -1 : 1));
  const numberOfCards = getNumberOfCards(cards);

  return (
    <List
      header={<SublistHeader type={type} numberOfCards={numberOfCards} />}
      dataSource={dataSource}
      style={{ width: '100%' }}
      renderItem={card => (
        <Card
          deck={deck}
          card={card}
          setOpenCardId={setOpenCardId}
          commander={commander}
          isOpen={card.oracle_id === openCardId}
        />
      )}
    />
  );
};
