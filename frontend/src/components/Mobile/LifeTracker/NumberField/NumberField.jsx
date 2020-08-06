import React from 'react';
import styled from 'styled-components';

import { Flex } from '../../../Elements/Shared';
import useLongPress from '../../../Hooks/useLongPress';

const StyledButton = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: rgba(0, 0, 0, 0.02);
    transform: scale(0.9);
  }
`;

const StyledValue = styled.div`
  /* font-size: 2rem; */
`;

export default ({
  value,
  setValue,
  maxValue = Infinity,
  minValue = -Infinity,
  step = 1,
  largeStep = 10,
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
    <Flex
      direction="row"
      style={{ width: '100%', height: '100%', position: 'relative', fontSize: '350%' }}
      align="center"
      justify="center"
    >
      <Flex
        direction="row"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <StyledButton {...longPressMinuteProps}>-</StyledButton>
        <StyledButton {...longPressPlusProps}>+</StyledButton>
      </Flex>
      <StyledValue>{value}</StyledValue>
    </Flex>
  );
};
