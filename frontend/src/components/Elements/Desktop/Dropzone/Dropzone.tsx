import React from 'react';
import styled, { css } from 'styled-components';
import { useDrop, DragObjectWithType } from 'react-dnd';

import { primaryDrop, primaryLight } from '../../../../constants/colors';

interface DropzoneProps {
  isOver: boolean;
  canDrop: boolean;
}

export const dropZoneStyle = css<DropzoneProps>`
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

const StyledDropzone = styled.div<DropzoneProps>`
  width: 100%;
  height: 100%;
  z-index: 99;
  user-select: none;
  ${dropZoneStyle}
`;

interface DropCard {
  id: string;
  name: string;
}

interface Props {
  children: React.ReactNode;
  onDrop: (card: DragObjectWithType) => void;
}

export default ({ children, onDrop }: Props) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'CARD',
    drop: onDrop,

    collect: (monitor) => ({
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
