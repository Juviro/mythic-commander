import React from 'react';

import {
  Flex,
  DeckTitle,
  ColorIdentitySymbols,
} from '../../../Elements/Shared';

export default ({ deck }) => {
  return (
    <Flex direction="row" align="center">
      <div style={{ marginRight: 8 }}>
        <ColorIdentitySymbols cards={deck.cards} size={24} />
      </div>
      <DeckTitle deck={deck} fontSize={28} />
    </Flex>
  );
};
