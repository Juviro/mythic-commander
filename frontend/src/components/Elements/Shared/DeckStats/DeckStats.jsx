import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import { getPriceLabel } from '../../../../utils/cardStats';
import Flex from '../Flex';
import CommanderPicker from '../CommanderPicker';
import NumberOfCards from './NumberOfCards';

const StyledLabel = styled(Typography.Text).attrs({ type: 'secondary' })`
  margin: 8px;
  font-size: 16px;
`;

export default ({ deck, displayOwnedOnly, toggleDisplayOwnedOnly }) => {
  const totalValue = deck.cards.reduce(
    (acc, { minPrice, amount }) => acc + minPrice * amount,
    0
  );
  const unownedValue = deck.cards.reduce(
    (acc, val) => (val.owned ? acc : acc + val.minPrice),
    0
  );

  const valueLabel = `Total Value: ${getPriceLabel(totalValue, {
    round: true,
  })}${
    unownedValue ? ` (${getPriceLabel(unownedValue, { round: true })} not owned)` : ''
  }`;

  return (
    <Flex direction="column" justify="space-around">
      <CommanderPicker deck={deck} />
      <NumberOfCards
        deck={deck}
        displayOwnedOnly={displayOwnedOnly}
        toggleDisplayOwnedOnly={toggleDisplayOwnedOnly}
      />
      <StyledLabel>{valueLabel}</StyledLabel>
    </Flex>
  );
};
