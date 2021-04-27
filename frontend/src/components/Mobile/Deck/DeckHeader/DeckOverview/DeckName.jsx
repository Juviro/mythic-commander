import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../assets/mtgIcons';

const StyledNameWrapper = styled(Typography.Title)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledColorIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 4px;
  border: 1px solid #bdbdbd;
  border-radius: 50%;
`;

export default ({ commander, name }) => {
  if (!name) return '';
  const colorIdentity = (commander && commander.color_identity) || [];
  // Colorless symbol for colorless commanders
  if (commander && !colorIdentity.length) colorIdentity.push('C');

  return (
    <StyledNameWrapper level={3}>
      {name}
      {colorIdentity.map((color) => (
        <StyledColorIcon src={colors[color]} alt={color} key={color} />
      ))}
    </StyledNameWrapper>
  );
};
