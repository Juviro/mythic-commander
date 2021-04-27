import React from 'react';
import styled from 'styled-components';

import { Flex, DeckTitle, ColorIdentitySymbols } from '../../../Elements/Shared';

const StyledPlaceholder = styled.div`
  height: 24px;
`;

export default ({ deck }) => {
  if (!deck) return <StyledPlaceholder />;
  return (
    <Flex direction="row" align="center">
      <ColorIdentitySymbols cards={deck.cards} size={24} />
      <DeckTitle deck={deck} />
    </Flex>
  );
};
