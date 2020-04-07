import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import AddCardDrawer from './AddCardDrawer';
import { useToggle } from '../../../Hooks';

const StyledButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export default ({ onAddCard, containedCards = [], visible }) => {
  const [isAdding, toggleIsAdding] = useToggle(false);

  if (!visible) return null;

  const containedCardNames = containedCards.map(({ name }) => name);

  return (
    <>
      <AddCardDrawer
        onAddCard={onAddCard}
        containedCardNames={containedCardNames}
        isVisible={isAdding}
        onClose={() => toggleIsAdding(false)}
      />
      <StyledButton>
        {!isAdding && (
          <Button
            icon={<PlusOutlined />}
            size="large"
            type="primary"
            shape="circle"
            onClick={() => toggleIsAdding(true)}
          />
        )}
      </StyledButton>
    </>
  );
};
