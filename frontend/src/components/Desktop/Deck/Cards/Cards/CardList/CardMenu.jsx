import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from 'antd';
import { Flex } from '../../../../../Elements/Shared';

import { getPriceLabel } from '../../../../../../utils/cardStats';
import keySymbols from '../../../../../../constants/keySymbols';

const StyledButton = styled(Button)`
  margin-top: 8px;
`;

export default ({ card, onOpenDetails }) => {
  console.log('card', card);
  const amount = `${card.amount}x`;
  const value = getPriceLabel(card.minPrice);

  return (
    <Flex direction="column" style={{ marginTop: 4 }}>
      <Flex justify="space-between" style={{ padding: '0 8px' }}>
        <Typography.Text strong>{amount}</Typography.Text>
        <Typography.Text strong>{value}</Typography.Text>
      </Flex>
      <StyledButton type="link" onClick={onOpenDetails}>
        {`Details [${keySymbols.ENTER}]`}
      </StyledButton>
      <StyledButton type="link" onClick={onOpenDetails}>
        Edit [E]
      </StyledButton>
      <StyledButton type="link" onClick={onOpenDetails} danger>
        {`Delete [${keySymbols.BACKSPACE}]`}
      </StyledButton>
    </Flex>
  );
};
