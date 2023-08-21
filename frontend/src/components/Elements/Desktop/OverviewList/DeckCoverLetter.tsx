import React from 'react';
import { colorPalette } from 'constants/colors';
import styled from 'styled-components';

const getColorFromId = (id) => {
  const stringAsNumber = id
    .split('')
    .map((char) => char.charCodeAt(0).toString(10))
    .reduce((acc, val) => acc + Number(val), 0);
  const index = stringAsNumber % colorPalette.length;
  return colorPalette[index];
};

const StyledCoverLetter = styled.div<{ size: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: ${({ size }) => size}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

interface Props {
  id: string;
  name: string;
  size?: number;
}

const DeckCoverLetter = ({ id, name, size = 100 }: Props) => {
  return (
    <StyledCoverLetter color={getColorFromId(id)} size={size}>
      {name.slice(0, 1)}
    </StyledCoverLetter>
  );
};

export default DeckCoverLetter;
