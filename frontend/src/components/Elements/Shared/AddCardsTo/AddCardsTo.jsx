import React, { useState, useEffect } from 'react';

import { RightOutlined } from '@ant-design/icons';
import Flex from '../Flex';
import CheckableCardlist from '../CheckableCardlist/CheckableCardlist';
import ListSelection from './Lists/ListSelection';
import InactiveOverlay from '../InactiveOverlay/InactiveOverlay';

export default ({ onSubmit, cardsToAdd }) => {
  const [selectedCardIds, setSelectedCardIds] = useState([]);

  useEffect(() => {
    if (selectedCardIds.length || !cardsToAdd.length) return;
    setSelectedCardIds(cardsToAdd.map(({ id }) => id));
    // eslint-disable-next-line
  }, [cardsToAdd]);

  const selectedCards = (cardsToAdd || []).filter(({ id }) =>
    selectedCardIds.includes(id)
  );

  return (
    <Flex direction="row">
      <Flex flex={1}>
        <CheckableCardlist
          cards={cardsToAdd}
          setSelectedCardIds={setSelectedCardIds}
          selectedCardIds={selectedCardIds}
        />
      </Flex>
      <Flex align="center" style={{ minHeight: 200 }}>
        <RightOutlined style={{ fontSize: 32, margin: '0 16px' }} />
      </Flex>
      <Flex flex={1}>
        <InactiveOverlay isInactive={!selectedCardIds.length}>
          <ListSelection onSubmit={onSubmit} selectedCards={selectedCards} />
        </InactiveOverlay>
      </Flex>
    </Flex>
  );
};
