import React from 'react';
import { withRouter } from 'react-router';
import CardSubList from './CardSubList';

const CARD_TYPES = ['Creature', 'Enchantment', 'Artifact', 'Instant', 'Sorcery', 'Planeswalker', 'Land'];

const DeckList = ({ deck }) => {
  const cards = deck.cards || [];
  const cardWithMainType = cards.map(card => ({
    ...card,
    mainType: CARD_TYPES.find(type => card.primaryTypes.includes(type)),
  }));
  const cardsByType = CARD_TYPES.map(type => ({
    type,
    cards: cardWithMainType.filter(card => card.mainType === type),
  }));

  return (
    <>
      {cardsByType.map(byType => (
        <CardSubList {...byType} key={byType.type} />
      ))}
    </>
  );
};

export default withRouter(DeckList);
