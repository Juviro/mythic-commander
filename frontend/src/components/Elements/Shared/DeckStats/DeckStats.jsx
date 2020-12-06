import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import { getListStats } from 'utils/getListStats';
import Flex from '../Flex';
import CommanderPicker from '../CommanderPicker';
import NumberOfCards from './NumberOfCards';

const StyledLabel = styled(Typography.Text).attrs({ type: 'secondary' })`
  margin: 8px;
  font-size: 16px;
`;

export default ({ deck, displayOwnedOnly, toggleDisplayOwnedOnly }) => {
  const { valueLabel } = getListStats(deck);

  return (
    <Flex direction="column" justify="space-around">
      <CommanderPicker deck={deck} />
      <NumberOfCards
        deck={deck}
        displayOwnedOnly={displayOwnedOnly}
        toggleDisplayOwnedOnly={toggleDisplayOwnedOnly}
      />
      <StyledLabel>{`Total Value: ${valueLabel}`}</StyledLabel>
    </Flex>
  );
};
