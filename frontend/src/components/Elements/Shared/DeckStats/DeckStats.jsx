import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import { getNumberOfCards } from '../../../../utils/deck';
import { getPriceLabel } from '../../../../utils/cardStats';
import Flex from '../Flex';

const StyledLabel = styled(Typography.Text).attrs({ type: 'secondary' })`
  margin: 8px;
  height: 33%;
  font-size: 16px;
`;

export default ({ deck }) => {
  const commander = deck.cards.find(({ isCommander }) => isCommander);
  const numberOfUnowned = deck.cards.filter(({ owned }) => !owned).length;
  const numberOfCardsLabel = `${getNumberOfCards(deck.cards)} cards ${
    numberOfUnowned ? `(${numberOfUnowned} not owned)` : ''
  }`;

  const totalValue = deck.cards.reduce((acc, val) => acc + val.minPrice, 0);
  const unownedValue = deck.cards.reduce(
    (acc, val) => (val.owned ? acc : acc + val.minPrice),
    0
  );

  const valueLabel = `Total value: ${getPriceLabel(totalValue, {
    round: true,
  })}${
    unownedValue
      ? ` (${getPriceLabel(unownedValue, { round: true })} not owned)`
      : ''
  }`;

  // TODO: always show commander, make editable, support 2nd commander
  return (
    <Flex direction="column">
      {commander && <StyledLabel strong>{`${commander.name}`}</StyledLabel>}
      <StyledLabel>{numberOfCardsLabel}</StyledLabel>
      <StyledLabel>{valueLabel}</StyledLabel>
    </Flex>
  );
};
