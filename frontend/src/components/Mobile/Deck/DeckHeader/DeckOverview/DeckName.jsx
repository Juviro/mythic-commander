import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../assets/icons';

const StyledNameWrapepr = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  align-items: center;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledColorIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  border: 1px solid #bdbdbd;
  border-radius: 50%;
`;

export default ({ commander, name }) => {
  if (!name) return '';
  const colorIdentity = (commander && commander.color_identity) || [];

  return (
    <StyledNameWrapepr>
      {name}
      {colorIdentity.map(color => (
        <StyledColorIcon src={colors[color]} alt={color} key={color} />
      ))}
    </StyledNameWrapepr>
  );
};
