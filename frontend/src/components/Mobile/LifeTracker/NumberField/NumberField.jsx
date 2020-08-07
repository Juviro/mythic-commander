import React from 'react';
import styled, { css } from 'styled-components';

import { Flex } from '../../../Elements/Shared';
import useLongPress from '../../../Hooks/useLongPress';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 200%;

  ${({ whiteText }) =>
    whiteText
      ? css`
          color: #fff;
          text-shadow: 2px 2px 0px #333;
        `
      : ''}
`;

const StyledButton = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 200%;

  &:active {
    background-color: rgba(0, 0, 0, 0.02);
    transform: scale(0.9);
  }

  &:nth-child(even) {
    margin-left: 20%;
  }
  &:nth-child(odd) {
    margin-right: 20%;
  }
`;

const StyledValue = styled.div`
  font-size: 300%;
  z-index: 1;
`;

export default ({
  value,
  setValue,
  maxValue = Infinity,
  minValue = -Infinity,
  step = 1,
  largeStep = 10,
  whiteText,
}) => {
  const changeValue = (isPlus, isLargeStep) => {
    const modifier = isPlus ? 1 : -1;
    const modifierStep = isLargeStep ? largeStep : step;
    const newValue = value + modifier * modifierStep;

    setValue(Math.min(Math.max(newValue, minValue), maxValue));
  };

  const longPressMinuteProps = useLongPress(
    () => changeValue(false, true),
    () => changeValue(false, false)
  );
  const longPressPlusProps = useLongPress(
    () => changeValue(true, true),
    () => changeValue(true, false)
  );

  return (
    <StyledWrapper whiteText={whiteText}>
      <Flex
        direction="row"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <StyledButton {...longPressMinuteProps}>-</StyledButton>
        <StyledButton {...longPressPlusProps}>+</StyledButton>
      </Flex>
      <StyledValue>{value}</StyledValue>
    </StyledWrapper>
  );
};
