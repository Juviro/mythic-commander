import React from 'react';
import styled, { css } from 'styled-components';
import { useDrop } from 'react-dnd';

import { primaryDrop, primaryLight } from '../../../../constants/colors';

const StyledDropzone = styled.div`
  width: 100%;
  height: 100%;
  z-index: 99;
  user-select: none;
  ${({ canDrop }) =>
    canDrop
      ? css`
          background-color: ${primaryLight};
        `
      : ''}
  ${({ isOver }) =>
    isOver
      ? css`
          background-color: ${primaryDrop};
        `
      : ''}
`;

export default ({ children, onAddCards }) => {
  const onDrop = ({ id, name }) => {
    onAddCards([{ id, amount: 1 }], name);
  };

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'CARD',
    drop: onDrop,

    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <StyledDropzone isOver={isOver} canDrop={canDrop}>
      <div ref={dropRef}>{children}</div>
    </StyledDropzone>
  );
};
