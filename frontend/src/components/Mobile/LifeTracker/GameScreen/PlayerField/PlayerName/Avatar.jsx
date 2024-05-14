import React from 'react';
import styled, { css } from 'styled-components';
import { getImageUrl } from 'utils/cardImage';
import { primary } from '../../../../../../constants/colors';

export const POISON_IMAGE = getImageUrl('40255bfa-0004-45f1-a31b-17d385f09a95');

const StyledAvatar = styled.div`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: ${({ color, img }) => (color || img ? '1px solid #353535' : 'none')};
  border-radius: 2px;

  ${({ img }) =>
    img
      ? css`
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(${img});
        `
      : ''}
  ${({ isInfect }) =>
    isInfect
      ? css`
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-position: 0px -12px;
          background-image: url(${POISON_IMAGE});
        `
      : ''}

  ${({ isSelected }) =>
    isSelected
      ? css`
          box-shadow: 0px 0px 4px 2px ${primary};
        `
      : ''}
`;

export default ({
  isInfect = false,
  img,
  color = null,
  height = 32,
  style = null,
  onClick = undefined,
  isSelected = false,
}) => {
  const width = height * 1.3;

  return (
    <StyledAvatar
      width={width}
      height={height}
      isInfect={isInfect}
      img={img}
      color={color}
      isSelected={isSelected}
      style={style}
      onClick={onClick}
    />
  );
};
