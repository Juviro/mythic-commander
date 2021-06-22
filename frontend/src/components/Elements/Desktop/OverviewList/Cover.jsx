import React from 'react';
import styled from 'styled-components';
import shimmer from 'components/Animations/shimmer';
import { colorPalette } from 'constants/colors';

const StyledCoverLetter = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

const StyledWrapper = styled.div`
  width: 100%;
  padding-bottom: 73.5%;
  position: relative;
  ${shimmer};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const getColorFromId = (id) => {
  const stringAsNumber = id
    .split('')
    .map((char) => char.charCodeAt(0).toString(10))
    .reduce((acc, val) => acc + Number(val), 0);
  const index = stringAsNumber % colorPalette.length;
  return colorPalette[index];
};

export default ({ list }) => {
  const { imgSrc, name, id } = list;

  const cover = imgSrc ? (
    <StyledImage src={imgSrc} alt={name} />
  ) : (
    <StyledCoverLetter color={getColorFromId(id)}>{name.slice(0, 1)}</StyledCoverLetter>
  );

  return <StyledWrapper>{cover}</StyledWrapper>;
};
