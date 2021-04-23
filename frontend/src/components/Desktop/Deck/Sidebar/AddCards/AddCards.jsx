import React from 'react';
import FadeIn from 'components/Elements/Shared/FadeIn';
import AdvancedSearch from './AdvancedSearch';

export default ({ onAddCards, deck, visible }) => {
  if (!visible) return null;

  const cardNames = deck && deck.cards.map(({ name }) => name);
  const alreadyInDeck = ({ name }) => cardNames && cardNames.includes(name);

  return (
    <FadeIn>
      <AdvancedSearch onAddCards={onAddCards} alreadyInDeck={alreadyInDeck} />
    </FadeIn>
  );
};
