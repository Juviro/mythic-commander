import React from 'react';
import styled from 'styled-components';
import { LongPress } from '../../../Elements/Mobile';

const LONG_PRESS_DELAY = 400;

const StyledValue = styled.div`
  padding: 4px;
`;

const StyledButton = styled.div`
  width: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: ${({ value }) => (value === '+' ? 'flex-end' : 'flex-start')};
  font-size: ${({ small }) => (small ? '100%' : '200%')};

  &:active ${StyledValue} {
    transform: scale(0.9);
  }
`;

export default ({ value, onPress, onLongPress, small }) => {
  return (
    <LongPress time={LONG_PRESS_DELAY} onLongPress={onLongPress} onPress={onPress}>
      <StyledButton value={value} small={small}>
        <StyledValue>{value}</StyledValue>
      </StyledButton>
    </LongPress>
  );
};
