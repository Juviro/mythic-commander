import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { primaryHover } from 'constants/colors';

const Styledindicator = styled.div<{ left: number; width: number; top }>`
  position: fixed;
  height: 2px;
  z-index: 400;
  background-color: ${primaryHover};

  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  top: ${({ top }) => top}px;

  transition:
    left 0.3s ease-out,
    width 0.3s ease-out;
`;

interface Props {
  type: string;
}

const calcPosition = (type: string) => {
  const element = document.getElementById(`indicator-${type}`);

  if (!element) {
    return { left: 0, width: 0, top: 32 };
  }
  const { width, left, top: elementTop, height } = element.getBoundingClientRect();
  const top = elementTop + height || 32;

  return { left, width, top };
};

const GridListSelectionIndicator = ({ type }: Props) => {
  const [position, setPosition] = useState(() => calcPosition(type));

  const debouncedCalcPosition = debounce(() => {
    setPosition(calcPosition(type));
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', debouncedCalcPosition);

    return () => window.removeEventListener('resize', debouncedCalcPosition);
  }, [debouncedCalcPosition, setPosition]);

  useEffect(() => {
    setPosition(calcPosition(type));
  }, [type]);

  return <Styledindicator {...position} />;
};

export default GridListSelectionIndicator;
