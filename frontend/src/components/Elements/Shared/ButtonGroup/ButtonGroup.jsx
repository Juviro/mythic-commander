import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import Flex from '../Flex';

const FadingWrapper = styled.div`
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 100%;
  max-height: 80px;
  width: 100%;
  font-size: 1rem;
`;

export default ({ buttons }) => {
  const buttonHeight = `calc(${100 / buttons.length}% - 32px)`;
  const maxHeight = buttons.length * 100;

  return (
    <Flex align="center" style={{ width: '100%', height: '100%' }}>
      <Flex
        direction="column"
        justify="space-around"
        style={{ width: '100%', height: '100%', maxHeight }}
      >
        {buttons.map(({ label, onClick }) => (
          <FadingWrapper height={buttonHeight} key={label}>
            <StyledButton ghost type="primary" onClick={onClick}>
              {label}
            </StyledButton>
          </FadingWrapper>
        ))}
      </Flex>
    </Flex>
  );
};
