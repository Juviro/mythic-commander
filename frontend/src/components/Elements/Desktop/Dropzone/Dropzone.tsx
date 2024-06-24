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
  ${({ isOver, canDrop }) =>
    isOver && canDrop
      ? css`
          background-color: ${primaryDrop};
        `
      : ''}
`;

const StyledDropzone = styled.div<DropzoneProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  ${dropZoneStyle}
`;

interface Props {
  children: any;
  listId?: string;
  onDrop?: (card: DragObjectWithType) => void;
  style?: React.CSSProperties;
  isOverStyle?: React.CSSProperties;
  canDropStyle?: React.CSSProperties;
  disabled?: boolean;
}

export default ({
  children,
  onDrop,
  listId,
  style,
  isOverStyle,
  canDropStyle,
  disabled,
}: Props) => {
  const [{ isOver, canDrop, offset }, dropRef] = useDrop({
    accept: 'CARD',
    drop: onDrop,
    canDrop: (_, monitor) => listId !== monitor.getItem().listId,

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      offset: monitor.getDifferenceFromInitialOffset(),
    }),
  });

  if (disabled) {
    if (typeof children === 'function') {
      return children({ isOver, canDrop, offset });
    }
    return children;
  }

  const getStyle = () => {
    if (isOver && isOverStyle) return { ...style, ...isOverStyle };
    if (canDrop && canDropStyle) return { ...style, ...canDropStyle };
    return style;
  };

  if (typeof children === 'function') {
    return (
      <StyledDropzone isOver={isOver} canDrop={canDrop} style={getStyle()} ref={dropRef}>
        {children({ isOver, canDrop, offset })}
      </StyledDropzone>
    );
  }

  return (
    <StyledDropzone isOver={isOver} canDrop={canDrop} style={getStyle()} ref={dropRef}>
      {children}
    </StyledDropzone>
  );
};
