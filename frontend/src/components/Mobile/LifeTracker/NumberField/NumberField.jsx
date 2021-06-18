import React from 'react';
import styled, { css } from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import PlusMinus from './PlusMinus';

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

  return (
    <StyledWrapper whiteText={whiteText}>
      <Flex
        direction="row"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <PlusMinus
          value="-"
          onLongPress={() => changeValue(false, true)}
          onPress={() => changeValue(false, false)}
        />
        <PlusMinus
          value="+"
          onLongPress={() => changeValue(true, true)}
          onPress={() => changeValue(true, false)}
        />
      </Flex>
      <StyledValue>{value}</StyledValue>
    </StyledWrapper>
  );
};
