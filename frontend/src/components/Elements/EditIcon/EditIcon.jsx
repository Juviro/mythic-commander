import React from 'react';
import styled from 'styled-components';
import { Icon, Typography } from 'antd';

const StyledWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  transition: all 0.2s;
  flex-direction: row;
  align-items: center;
  overflow: hidden;

  width: ${({ isEditing }) => (isEditing ? '50px' : '16px')};
`;

const StyledLabel = styled.span`
  font-weight: 500;
`;

export default ({
  onClick,
  isEditing,
  editingText = 'Back',
  editingIcon = 'right',
  onDiscard,
}) => {
  return (
    <StyledWrapper>
      <StyledIconWrapper onClick={onClick} isEditing={isEditing}>
        <Icon
          type={isEditing ? editingIcon : 'edit'}
          style={{ color: '#1890ff', marginRight: 4 }}
        />
        <StyledLabel>{editingText}</StyledLabel>
      </StyledIconWrapper>
      {onDiscard && isEditing && (
        <Typography.Text
          type="danger"
          style={{ fontSize: 13 }}
          onClick={onDiscard}
        >
          discard changes
        </Typography.Text>
      )}
    </StyledWrapper>
  );
};
