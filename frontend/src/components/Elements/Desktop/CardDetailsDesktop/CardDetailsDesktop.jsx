import React, { useState, useEffect } from 'react';

import CardDetailBody from './CardDetailBody';

export default ({ card, loading, largeHeader }) => {
  const cardId = card && card.id;
  const [selectedCardId, setSelectedCardId] = useState(cardId);

  useEffect(() => {
    setSelectedCardId(cardId);
  }, [cardId]);

  const selectedCard =
    card &&
    card.allSets &&
    card.allSets.find(({ id }) => id === selectedCardId);
  const fullCard = { ...card, ...selectedCard };

  return (
    <CardDetailBody
      card={fullCard}
      loading={loading}
      largeHeader={largeHeader}
      selectedCardId={selectedCardId}
      setSelectedCardId={setSelectedCardId}
    />
  );
};
