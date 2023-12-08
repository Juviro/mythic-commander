import React from 'react';
import styled, { css } from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import { primary } from '../../../../../constants/colors';
import { useToggle } from '../../../../Hooks';
import MenuItems from './MenuItems';

const StyledIconWrapper = styled.div`
  border-radius: 50%;
  border: 3px solid black;
  background-color: black;
  padding: 8px;
  pointer-events: auto;
  z-index: 10;
  transition: all 0.3s;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: scale(0.95);
      background-color: ${primary};
    `}
`;

const StyledMenuIcon = styled.img`
  height: 32px;
  width: 32px;
`;

export default ({ handle, onRestartGame }) => {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        top: 0,
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        pointerEvents: 'none',
      }}
    >
      <StyledIconWrapper isOpen={isOpen} onClick={toggleIsOpen}>
        <StyledMenuIcon src="/favicon.svg" />
      </StyledIconWrapper>
      <MenuItems
        isOpen={isOpen}
        handle={handle}
        onCloseMenu={toggleIsOpen}
        onRestartGame={onRestartGame}
      />
    </Flex>
  );
};
