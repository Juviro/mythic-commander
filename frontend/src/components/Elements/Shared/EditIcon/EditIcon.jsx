import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const StyledWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  min-width: 200px;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  transition: all 0.2s;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  align-items: center;

  width: ${({ isEditing }) => (isEditing ? '50px' : '16px')};
`;

const StyledLabel = styled.div`
  font-weight: 500;
`;

export default ({
  onClick,
  isEditing,
  editingText = 'Save',
  BackIcon = SaveOutlined,
  onDiscard,
}) => {
  return (
    <StyledWrapper>
      <StyledIconWrapper onClick={onClick} isEditing={isEditing}>
        {isEditing ? (
          <BackIcon style={{ color: '#1890ff', marginRight: 4 }} />
        ) : (
          <EditOutlined style={{ color: '#1890ff', marginRight: 4 }} />
        )}
        <StyledLabel>{editingText}</StyledLabel>
      </StyledIconWrapper>
      {onDiscard && isEditing && (
        <Typography.Text
          type="danger"
          style={{ fontSize: 13, cursor: 'pointer' }}
          onClick={onDiscard}
        >
          discard changes
        </Typography.Text>
      )}
    </StyledWrapper>
  );
};
