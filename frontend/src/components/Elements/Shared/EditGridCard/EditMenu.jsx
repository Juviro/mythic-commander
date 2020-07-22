import React, { useState, useEffect } from 'react';
import {
  CloseOutlined,
  DeleteOutlined,
  SaveOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { Button } from 'antd';

import SetPicker from '../SetPicker';
import { useToggle } from '../../../Hooks';
import MoveToModal from '../MoveTo/MoveToModal';
import AmountInput from '../AmountInput';

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10% 10% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  max-height: 18%;
`;

const StyedCloseIcon = styled(CloseOutlined)`
  position: absolute;
  color: white;
  top: 5%;
  right: 5%;
  font-size: 200%;
`;

export default ({
  card,
  onEditCard,
  onDeleteCard,
  onClose,
  isEditing,
  isLarge,
  moveToList,
}) => {
  const [isMovingCard, toggleIsMovingCard] = useToggle();
  const [newProps, setNewProps] = useState({});

  useEffect(() => {
    if (!isEditing) setNewProps({});
  }, [isEditing]);

  if (!isEditing) return null;

  const onChangeProp = key => value => {
    setNewProps({
      ...newProps,
      [key]: value,
    });
  };

  const onSubmit = () => {
    onEditCard(card.id, newProps);
    setNewProps({});
    onClose();
  };

  const canSubmit = Object.keys(newProps).length;
  const size = isLarge ? 'normal' : 'small';

  return (
    <>
      <StyledWrapper>
        {onEditCard && (
          <>
            <StyledOption>
              <AmountInput
                size={size}
                canSubmit={canSubmit}
                card={card}
                onSubmit={onSubmit}
                onChange={onChangeProp('amount')}
              />
            </StyledOption>
            <StyledOption>
              {isEditing && (
                <SetPicker size={size} card={card} onSelect={onChangeProp('id')} />
              )}
            </StyledOption>
            <StyledOption>
              <Button
                size={size}
                disabled={!canSubmit}
                type="primary"
                icon={<SaveOutlined />}
                onClick={onSubmit}
                style={{
                  color: canSubmit ? undefined : 'grey',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  width: '100%',
                }}
              >
                Save
              </Button>
            </StyledOption>
          </>
        )}
        {moveToList && (
          <StyledOption>
            <Button
              size={size}
              type="primary"
              icon={<SwapRightOutlined />}
              onClick={toggleIsMovingCard}
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                marginTop: '15%',
              }}
            >
              Move to...
            </Button>
          </StyledOption>
        )}
        {onDeleteCard && (
          <StyledOption>
            <Button
              danger
              size={size}
              icon={<DeleteOutlined />}
              onClick={() => onDeleteCard(card.id)}
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                marginTop: '5%',
              }}
            >
              Delete
            </Button>
          </StyledOption>
        )}
      </StyledWrapper>
      <MoveToModal
        visible={isMovingCard}
        onCancel={toggleIsMovingCard}
        moveToList={moveToList}
        card={card}
      />
      <StyedCloseIcon onClick={onClose} />
    </>
  );
};
