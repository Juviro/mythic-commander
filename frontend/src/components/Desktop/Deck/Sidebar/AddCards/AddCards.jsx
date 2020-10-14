import React from 'react';
import AdvancedSearch from './AdvancedSearch';

export default ({ onAddCards, deck, visible }) => {
  if (!visible) return null;

  const cardNames = deck && deck.cards.map(({ name }) => name);
  const alreadyInDeck = ({ name }) => cardNames && cardNames.includes(name);

  return <AdvancedSearch onAddCards={onAddCards} alreadyInDeck={alreadyInDeck} />;
};
