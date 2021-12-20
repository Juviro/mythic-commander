import React from 'react';
import styled from 'styled-components';

const StyledListTitle = styled.li<{ color?: string }>`
  color: ${({ color }) => color || 'black'};
  margin-right: 48px;
  cursor: pointer;
  padding: 8px;
  position: relative;
`;

interface Props {
  color?: string;
  count: number;
  type: string;
  onClick: () => void;
}

const GridListSelectionItem = ({ color, onClick, type, count }: Props) => {
  const title = type === 'Commander' ? type : `${type} (${count})`;

  return (
    <StyledListTitle color={color} onClick={onClick} id={`indicator-${type}`}>
      {title}
    </StyledListTitle>
  );
};

export default GridListSelectionItem;
