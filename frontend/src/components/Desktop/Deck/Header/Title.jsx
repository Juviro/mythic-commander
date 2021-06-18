import React from 'react';
import styled from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import DeckTitle from 'components/Elements/Shared/DeckTitle';
import ColorIdentitySymbols from 'components/Elements/Shared/ColorIdentitySymbols';

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
