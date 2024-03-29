import React, { useState, useEffect } from 'react';

import CardDetailBody from './CardDetailBody';

const CardDetailsDesktop = ({
  card,
  fallbackCard,
  initialCardId,
  loading,
  largeHeader,
  parentLoading,
}) => {
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
      parentLoading={parentLoading}
      selectedCard={selectedCard}
      selectedCardId={selectedCardId}
      setSelectedCardId={setSelectedCardId}
    />
  );
};

export default CardDetailsDesktop;
