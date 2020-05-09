import React from 'react';
import { Button, Divider } from 'antd';
import sumCardAmount from '../../../../../utils/sumCardAmount';

export default ({ onAddToCollection, cardsToAdd }) => {
  const unownedCards = cardsToAdd.filter(({ owned }) => !owned);

  const numberOfUnownedCards = sumCardAmount(unownedCards);
  const numberOfAllCards = sumCardAmount(cardsToAdd);

  return (
    <>
      <Divider>Add to your collection</Divider>
      <Button
        style={{ width: '100%' }}
        type="primary"
        ghost
        disabled={!numberOfUnownedCards}
        onClick={() => onAddToCollection(unownedCards)}
      >
        {`Add unowned cards to Collection (${numberOfUnownedCards})`}
      </Button>
      <Button
        style={{ width: '100%', marginTop: 16 }}
        type="primary"
        ghost
        onClick={() => onAddToCollection(cardsToAdd)}
      >
        {`Add all cards to Collection (${numberOfAllCards})`}
      </Button>
    </>
  );
};
