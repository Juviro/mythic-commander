import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import EditMenu from './EditMenu';
import { useToggle } from '../../../Hooks';
import CardButton from '../CardButton';

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

export default ({ moveToList, card, onEditCard, onDeleteCard, isLarge }) => {
  const [isEditing, toggleIsEditing] = useToggle(false);

  const onChangeIsEditing = e => {
    e.stopPropagation();
    toggleIsEditing();
  };

  if (!moveToList && !onEditCard && !onDeleteCard) return null;

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
            moveToList={moveToList}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
            onClose={() => toggleIsEditing(false)}
          />
        </StyledBody>
      </StyledWrapper>
    </>
  );
};
