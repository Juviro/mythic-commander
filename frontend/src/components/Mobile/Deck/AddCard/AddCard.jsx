import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import AddCardDrawer from './AddCardDrawer';

const StyledButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export default () => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <StyledButton>
      <AddCardDrawer isVisible={isAdding} onClose={() => setIsAdding(false)} />
      {!isAdding && (
        <Button
          icon="plus"
          size="large"
          type="primary"
          shape="circle"
          onClick={() => setIsAdding(true)}
        />
      )}
    </StyledButton>
  );
};
