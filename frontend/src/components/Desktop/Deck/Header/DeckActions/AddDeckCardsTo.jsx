import React from 'react';
import { Button } from 'antd';

import { AddCardsTo } from '../../../../Elements/Shared';
import { useToggle } from '../../../../Hooks';
import sumCardAmount from '../../../../../utils/sumCardAmount';

export default ({ cards }) => {
  const [visible, toggleVisible] = useToggle();
  const numberOfSelectedCards = sumCardAmount(cards);

  return (
    <>
      <Button type="link" onClick={toggleVisible}>
        Add cards to...
      </Button>
      <AddCardsTo
        cardsToAdd={cards}
        onCancel={toggleVisible}
        onSubmit={toggleVisible}
        visible={visible}
        numberOfSelectedCards={numberOfSelectedCards}
      />
    </>
  );
};
