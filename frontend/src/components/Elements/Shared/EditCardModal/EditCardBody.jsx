import React, { useState } from 'react';
import styled from 'styled-components';

import isMobile from 'utils/isMobile';
import { Checkbox, Typography } from 'antd';
import Card from '../Card';
import SetPicker from '../SetPicker';
import AmountInput from '../AmountInput';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const StyledContent = styled.div`
  flex: 1;
  margin-top: 24px;

  @media (min-width: 500px) {
    margin-top: 0;
  }
`;

const StyledImageWrapper = styled.div`
  width: 30%;
  min-width: 150px;
  margin-right: 24px;
  align-self: center;
`;

export default ({ card, onChangeProp, canSubmit, onSubmit }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <StyledWrapper>
      <StyledImageWrapper>
        <Card card={selectedCard || card} />
      </StyledImageWrapper>
      <StyledContent>
        <Typography.Text strong>Amount</Typography.Text>
        <AmountInput
          hideText
          card={card}
          autoFocus={!isMobile()}
          canSubmit={canSubmit}
          onSubmit={onSubmit}
          onChange={onChangeProp('amount')}
          style={{ marginBottom: 16 }}
        />
        <Typography.Text strong>Set</Typography.Text>
        <SetPicker
          onSubmit={canSubmit && onSubmit}
          size="default"
          card={card}
          onSelectCard={setSelectedCard}
          onSelect={onChangeProp('id')}
        />
        <Checkbox
          onChange={(e) => onChangeProp('isDefault')(e.target.checked)}
          style={{ marginLeft: 0, marginTop: 16 }}
        >
          Set as Default Card Version
        </Checkbox>
      </StyledContent>
    </StyledWrapper>
  );
};
