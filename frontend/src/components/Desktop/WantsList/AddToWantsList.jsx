import React from 'react';
import AddCards from 'components/Elements/Desktop/AddCards';

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
