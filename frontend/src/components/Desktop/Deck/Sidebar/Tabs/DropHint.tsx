import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { primaryDark } from 'constants/colors';
import { UnifiedWantsList } from 'types/unifiedTypes';

const StyledDropHint = styled.div<{ offset: { x: number; y: number } }>`
  position: fixed;
  /* transform: rotate(270deg) translate(-115%, 160%); */
  /* transform-origin: left; */
  font-size: 36px;
  top: 0;
  left: 0;
  height: 60px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transform: translate(${({ offset }) => (offset ? `${offset.x}px,${offset.y}px` : '')});
`;

const StyledHintTitel = styled.h3`
  padding: 0 1em;
  transform: rotate(270deg);
  color: ${primaryDark};
  background-color: rgb(255 255 255 / 70%);
`;

const StyledListName = styled.span`
  font-style: italic;
`;

interface Props {
  wantsList: UnifiedWantsList;
  offset: { x: number; y: number };
}

export const DropHint = ({ wantsList, offset }: Props) => {
  // console.log('offset', offset);
  return null;
  const ref = useRef<HTMLDivElement | null>(null);
  // const onMoveMouse = (e: MouseEvent) => {
  //   const { x, y } = e;
  //   console.log('set mouse pos to', x, y);
  //   // eslint-disable-next-line
  //   ref.current.style.transform = `translate(${y}px, ${x}px)`;
  // };

  // useEffect(() => {
  //   document.addEventListener('mousemove', onMoveMouse);
  //   return () => document.removeEventListener('mousemove', onMoveMouse);
  // }, []);

  return (
    <StyledDropHint offset={offset}>
      <StyledHintTitel>
        <span>Move card to </span>
        <StyledListName>{wantsList.name}</StyledListName>
      </StyledHintTitel>
    </StyledDropHint>
  );
};
