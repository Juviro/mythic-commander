import React from 'react';

import styled from 'styled-components';
import SetPicker from './SetPicker';
import AmountPicker from './AmountPicker';
import Delete from './Delete';
import { blendIn } from '../../../../../../Animations';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  animation: ${blendIn} 0.5s linear;
`;

const StyledItem = styled.div`
  color: inherit;
`;

const StyledLabel = styled.span`
  display: flex;
  color: #313030;
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  margin-bottom: -10px;
`;

export default ({ card }) => {
  return (
    <StyledWrapper>
      <StyledItem>
        <StyledLabel>Set</StyledLabel>
        <SetPicker card={card} />
      </StyledItem>
      <StyledItem>
        <StyledLabel>Amount</StyledLabel>
        <AmountPicker card={card} />
      </StyledItem>
      <StyledItem>
        <Delete card={card} />
      </StyledItem>
    </StyledWrapper>
  );
};
