import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardInfo from './CardInfo';
import CardEdit from './CardEdit';
import EditIcon from '../../../../../../Elements/EditIcon';

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

export default ({ card, isVisible, isLegal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const onToggleEdit = () => setIsEditing(!isEditing);

  useEffect(() => {
    if (!isVisible && isEditing) setIsEditing(false);
  }, [isVisible, isEditing]);

  return (
    <div>
      <StyledInnerStatsWrapper isVisible={isVisible}>
        <EditIcon onClick={onToggleEdit} isEditing={isEditing} />
        {!isEditing ? (
          <CardInfo card={card} isLegal={isLegal} />
        ) : (
          <CardEdit card={card} />
        )}
      </StyledInnerStatsWrapper>
    </div>
  );
};
