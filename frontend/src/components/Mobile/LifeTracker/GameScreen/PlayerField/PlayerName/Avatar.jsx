import React from 'react';
import styled, { css } from 'styled-components';
import { primary } from '../../../../../../constants/colors';

export const POISON_IMAGE =
  'https://img.scryfall.com/cards/normal/front/8/5/856e308d-6268-4311-9667-c2f761db8f99.jpg?1562164863';

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
          background-position: 0px -16px;
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

export default ({ isInfect, img, color, height = 32, style, onClick, isSelected }) => {
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
