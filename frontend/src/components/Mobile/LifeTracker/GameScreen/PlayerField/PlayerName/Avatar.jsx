import React from 'react';
import styled, { css } from 'styled-components';
import { primary } from '../../../../../../constants/colors';

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

  ${({ isSelected }) =>
    isSelected
      ? css`
          box-shadow: 0px 0px 4px 2px ${primary};
        `
      : ''}
`;

export default ({ img, color, height = 32, style, onClick, isSelected }) => {
  const width = height * 1.3;

  return (
    <StyledAvatar
      width={width}
      height={height}
      img={img}
      color={color}
      isSelected={isSelected}
      style={style}
      onClick={onClick}
    />
  );
};
