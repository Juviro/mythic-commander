import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import CardInfo from './CardInfo';
import CardEdit from './CardEdit';

const StyledInnerStatsWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  margin-left: -100vw;
  overflow: hidden;
  position: absolute;
  flex-direction: column;
  transition: all 0.2s;
  width: calc(50vw - 16px);
  height: calc((50vw * 1.35));

  ${({ isVisible }) => {
    if (!isVisible) return '';
    return `
      margin-left: 8px;
    `;
  }}
`;

const StyledIconWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  transition: all 0.2s;
  flex-direction: row;
  align-items: center;

  margin-right: ${({ isEditing }) => (isEditing ? '0' : '-100px')};
`;

export default ({ card, isVisible, isLegal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const onToggleEdit = () => setIsEditing(!isEditing);
  return (
    <div>
      <StyledInnerStatsWrapper isVisible={isVisible}>
        <StyledIconWrapper onClick={onToggleEdit} isEditing={isEditing}>
          <Icon type="edit" style={{ color: '#1890ff', marginRight: 4 }} />
          <span>Edit your card...</span>
        </StyledIconWrapper>
        {!isEditing ? <CardInfo card={card} isLegal={isLegal} /> : <CardEdit card={card} />}
      </StyledInnerStatsWrapper>
    </div>
  );
};
