import React, { useState } from 'react';
import { CloseOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Button, InputNumber, Input } from 'antd';
import SetPicker from '../../SetPicker';

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
`;

const StyedCloseIcon = styled(CloseOutlined)`
  position: absolute;
  color: white;
  top: 5%;
  right: 5%;
  font-size: 200%;
`;

export default ({ card, onChangeElement, onDeleteElement, onClose }) => {
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

  return (
    <>
      <StyledWrapper>
        <StyledOption>
          <Input
            addonBefore="Amount"
            style={{ width: '100%' }}
            defaultValue={displayedAmount}
            onChange={e => onChangeProp('amount')(e.target.value || 1)}
          />
        </StyledOption>
        <StyledOption>
          <SetPicker size="normal" card={card} onSelect={onChangeProp('id')} />
        </StyledOption>
        <StyledOption>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDeleteElement(card.id)}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: '100%' }}
          >
            Delete
          </Button>
        </StyledOption>
        <StyledOption>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={onSave}
            style={{
              marginTop: 24,
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
