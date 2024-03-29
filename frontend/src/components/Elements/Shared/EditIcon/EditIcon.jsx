import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import DesktopTooltip from '../../Desktop/DesktopTooltip/DesktopTooltip';
import { primary } from '../../../../constants/colors';

const StyledWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  margin-left: 16px;
  align-items: center;
  min-width: ${({ isEditing }) => (isEditing ? 200 : 0)}px;
  max-width: 400px;
  align-self: flex-end;
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
    <StyledWrapper isEditing={isEditing}>
      <StyledIconWrapper onClick={onClick} isEditing={isEditing}>
        {isEditing ? (
          <BackIcon style={{ color: primary, marginRight: 4 }} />
        ) : (
          <DesktopTooltip title="Edit [E]">
            <EditOutlined style={{ color: primary, marginRight: 4 }} />
          </DesktopTooltip>
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
