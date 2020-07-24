import React from 'react';

import { Flex, DeckTitle, ColorIdentitySymbols } from '../../../Elements/Shared';

export default ({ deck }) => {
  return (
    <Flex direction="row" align="center">
      <ColorIdentitySymbols cards={deck.cards} size={24} />
      <DeckTitle deck={deck} />
    </Flex>
  );
};
