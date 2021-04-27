import React, { useState, useEffect } from 'react';

import CardDetailBody from './CardDetailBody';

export default ({ card, fallbackCard, initialCardId, loading, largeHeader }) => {
  const cardId = initialCardId || card?.id;
  const [selectedCardId, setSelectedCardId] = useState(cardId);

  useEffect(() => {
    setSelectedCardId(cardId);
  }, [cardId]);

  const selectedCard =
    card && card.allSets && card.allSets.find(({ id }) => id === selectedCardId);
  const fullCard = { ...card, ...selectedCard };

  return (
    <CardDetailBody
      card={fullCard}
      loading={loading}
      fallbackCard={fallbackCard}
      largeHeader={largeHeader}
      selectedCardId={selectedCardId}
      setSelectedCardId={setSelectedCardId}
    />
  );
};
