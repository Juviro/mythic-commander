import React, { useState } from 'react';
import { Button } from 'antd';
import styled, { css } from 'styled-components';
import Flex from '../Flex';

const ANIMATION_DURATION = 700;

const FadingWrapper = styled.div`
  height: ${({ height }) => height};
  display: flex;
  align-items: center;

  ${({ isFaded }) =>
    isFaded
      ? css`
          opacity: 0;
          transition: opacity ${ANIMATION_DURATION}ms ease-out;
        `
      : ''}
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

  const [clickedButton, setClickedButton] = useState(null);

  const onButtonClick = (onClick, label) => () => {
    setClickedButton(label);
    setTimeout(onClick, ANIMATION_DURATION);
  };

  return (
    <Flex align="center" style={{ width: '100%', height: '100%' }}>
      <Flex
        direction="column"
        justify="space-around"
        style={{ width: '100%', height: '100%', maxHeight }}
      >
        {buttons.map(({ label, onClick }) => (
          <FadingWrapper
            height={buttonHeight}
            isFaded={clickedButton && clickedButton !== label}
            key={label}
          >
            <StyledButton
              ghost={!clickedButton || clickedButton !== label}
              type="primary"
              onClick={onButtonClick(onClick, label)}
            >
              {label}
            </StyledButton>
          </FadingWrapper>
        ))}
      </Flex>
    </Flex>
  );
};
