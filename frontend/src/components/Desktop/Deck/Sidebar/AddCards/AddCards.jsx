import React from 'react';
import AdvancedSearch from './AdvancedSearch';

export default ({ onAddCards, deck }) => {
  const cardNames = deck && deck.cards.map(({ name }) => name);
  const alreadyInDeck = ({ name }) => cardNames && cardNames.includes(name);

  return (
    <>
      <AdvancedSearch onAddCards={onAddCards} alreadyInDeck={alreadyInDeck} />
    </>
  );
};
