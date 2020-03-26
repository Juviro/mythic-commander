import React, { useState } from 'react';
import { CloseOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import SetPicker from '../../SetPicker';

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
  onChangeElement,
  onDeleteElement,
  onClose,
  isEditing,
  isLarge,
}) => {
  const [newProps, setNewProps] = useState({});
  const displayedAmount = card.amount || card.totalAmount;

  const onChangeProp = key => value => {
    setNewProps({
      ...newProps,
      [key]: value,
    });
  };

  const onSave = () => {
    onChangeElement(card.id, newProps);
    setNewProps({});
    onClose();
  };

  const canSubmit = Object.keys(newProps).length;
  const size = isLarge ? 'normal' : 'small';

  return (
    <>
      <StyledWrapper>
        <StyledOption>
          <Input
            size={size}
            addonBefore={isLarge ? 'Amount' : undefined}
            style={{ width: '100%' }}
            defaultValue={displayedAmount}
            onChange={e => onChangeProp('amount')(Number(e.target.value) || 1)}
          />
        </StyledOption>
        <StyledOption>
          {isEditing && (
            <SetPicker size={size} card={card} onSelect={onChangeProp('id')} />
          )}
        </StyledOption>
        <StyledOption>
          <Button
            danger
            size={size}
            icon={<DeleteOutlined />}
            onClick={() => onDeleteElement(card.id)}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: '100%' }}
          >
            Delete
          </Button>
        </StyledOption>
        <StyledOption>
          <Button
            size={size}
            disabled={!canSubmit}
            type="primary"
            icon={<SaveOutlined />}
            onClick={onSave}
            style={{
              marginTop: '15%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
            }}
          >
            Save
          </Button>
        </StyledOption>
      </StyledWrapper>
      <StyedCloseIcon onClick={onClose} />
    </>
  );
};
