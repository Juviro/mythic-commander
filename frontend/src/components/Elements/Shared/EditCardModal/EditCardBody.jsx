import React, { useState } from 'react';
import styled from 'styled-components';

import FlippableCard from '../FlippableCard';
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
  margin-bottom: 24px;
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
        <FlippableCard card={selectedCard || card} />
      </StyledImageWrapper>
      <StyledContent>
        <AmountInput
          autoFocus
          canSubmit={canSubmit}
          card={card}
          onSubmit={onSubmit}
          onChange={onChangeProp('amount')}
        />
        <SetPicker
          onSubmit={canSubmit && onSubmit}
          size="default"
          card={card}
          onSelectCard={setSelectedCard}
          onSelect={onChangeProp('id')}
          style={{ marginTop: 16 }}
        />
      </StyledContent>
    </StyledWrapper>
  );
};
