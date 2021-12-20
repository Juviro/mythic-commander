import { primary, primaryHover } from 'constants/colors';
import React from 'react';
import styled, { css } from 'styled-components';

const StyledListTitle = styled.li<{ color?: string; active: boolean }>`
  color: ${({ color }) => color || 'black'};
  margin-right: 48px;
  cursor: pointer;
  position: relative;

  transition: color 0.4s ease-out;

  &:after {
    content: '';
    display: block;
    opacity: 0;
    width: calc(100% + 12px);
    height: 2px;
    background-color: ${({ color }) => (color ? `${color}80` : primaryHover)};
    position: absolute;
    bottom: -2px;
    left: -6px;
    transition: opacity 0.4s ease-out;
  }

  ${({ active, color }) =>
    active &&
    css`
      color: ${color || primary};

      &:after {
        opacity: 1;
      }
    `}
`;

interface Props {
  color?: string;
  active: boolean;
  count: number;
  type: React.ReactNode;
  onClick: () => void;
}

const GridListSelectionItem = ({ color, onClick, type, active, count }: Props) => {
  const title = type === 'Commander' ? type : `${type} (${count})`;

  return (
    <StyledListTitle color={color} onClick={onClick} active={active}>
      {title}
    </StyledListTitle>
  );
};

export default GridListSelectionItem;
