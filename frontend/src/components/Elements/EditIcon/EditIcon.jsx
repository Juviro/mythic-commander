import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const StyledIconWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  transition: all 0.2s;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  margin-bottom: 8px;

  width: ${({ isEditing }) => (isEditing ? '50px' : '16px')};
`;

const StyledLabel = styled.span`
  font-weight: 500;
`;

export default ({ onClick, isEditing }) => {
  return (
    <StyledIconWrapper onClick={onClick} isEditing={isEditing}>
      <Icon
        type={isEditing ? 'right' : 'edit'}
        style={{ color: '#1890ff', marginRight: 4 }}
      />
      <StyledLabel>Back</StyledLabel>
    </StyledIconWrapper>
  );
};
