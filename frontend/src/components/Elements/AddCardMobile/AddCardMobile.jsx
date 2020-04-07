import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import AddCardDrawer from './AddCardDrawer';

const StyledButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export default ({ onAddCard, containedCards = [], visible }) => {
  const [isAdding, setIsAdding] = useState(false);

  if (!visible) return null;

  const containedCardNames = containedCards.map(({ name }) => name);

  return (
    <>
      <AddCardDrawer
        onAddCard={onAddCard}
        containedCardNames={containedCardNames}
        isVisible={isAdding}
        onClose={() => setIsAdding(false)}
      />
      <StyledButton>
        {!isAdding && (
          <Button
            icon={<PlusOutlined />}
            size="large"
            type="primary"
            shape="circle"
            onClick={() => setIsAdding(true)}
          />
        )}
      </StyledButton>
    </>
  );
};
