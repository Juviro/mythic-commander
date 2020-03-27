import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import CardButton from '../../CardButton/CardButton';
import EditMenu from './EditMenu';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 8;
  border-radius: 4%;
  overflow: hidden;
  position: absolute;
  pointer-events: none;
`;

const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  transition: all 0.1s ease-out;
  pointer-events: all;
  transform: translateY(${({ visible }) => (visible ? 0 : '-100%')});
`;

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.6;
  background-color: black;
`;

export default ({ card, onEditCard, onDeleteCard, isLarge }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onChangeIsEditing = e => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  return (
    <>
      <CardButton onClick={onChangeIsEditing} index={0} Icon={EditOutlined} />
      <StyledWrapper>
        <StyledBody visible={isEditing} onClick={e => e.stopPropagation()}>
          <StyledOverlay />
          <EditMenu
            card={card}
            isLarge={isLarge}
            isEditing={isEditing}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
            onClose={() => setIsEditing(false)}
          />
        </StyledBody>
      </StyledWrapper>
    </>
  );
};