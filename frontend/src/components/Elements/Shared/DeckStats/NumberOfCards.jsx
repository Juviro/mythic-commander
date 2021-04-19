import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import sumCardAmount from '../../../../utils/sumCardAmount';

const StyledLabel = styled(Typography.Text).attrs({ type: 'secondary' })`
  margin: 8px;
  font-size: 16px;
`;

export default ({ deck }) => {
  const numberOfUnowned = deck.cards.filter(({ owned }) => !owned).length;

  return (
    <span>
      <StyledLabel>
        {`${sumCardAmount(deck.cards)} cards`}
        {Boolean(numberOfUnowned) && ` (${numberOfUnowned} unowned)`}
      </StyledLabel>
    </span>
  );
};
