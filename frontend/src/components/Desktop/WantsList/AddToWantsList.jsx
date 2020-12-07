import React from 'react';
import { AddCards } from '../../Elements/Desktop';

export default ({ cards: containedCards = [], onAddCards }) => {
  const containedCardNames = containedCards.map(({ name }) => name);

  return (
    <AddCards
      containedCardNames={containedCardNames}
      onAddCards={onAddCards}
      autoFocus={false}
    />
  );
};
