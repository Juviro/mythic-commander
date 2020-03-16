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

export default ({ onAddCard }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <AddCardDrawer
        onAddCard={onAddCard}
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
