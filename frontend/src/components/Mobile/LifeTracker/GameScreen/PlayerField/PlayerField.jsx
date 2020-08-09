import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import PlayerName from './PlayerName';
import NumberField from '../../NumberField';
import { useWindowSize } from '../../../../Hooks';

const initialHeight = window.innerHeight;

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  border: 1px solid black;
  background-color: ${({ color }) => color};

  ${({ img }) =>
    img
      ? css`
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(${img});
        `
      : ''}
  ${({ minWidth }) =>
    minWidth
      ? css`
          min-width: ${minWidth};
        `
      : ''}
`;

export default ({ player, players, numberOfPlayersInRow, onSetLife, onUpdatePlayer }) => {
  useWindowSize();
  const currentHeight = window.innerHeight;
  const [fullscreenHeight, setFullscreenHeight] = useState(initialHeight);

  useEffect(() => {
    if (currentHeight >= initialHeight) {
      setFullscreenHeight(currentHeight);
    }
  }, [currentHeight, setFullscreenHeight]);

  return (
    <StyledWrapper
      img={player.img}
      color={player.color}
      minWidth={
        numberOfPlayersInRow !== 1 && `${fullscreenHeight / numberOfPlayersInRow}px`
      }
    >
      <NumberField
        whiteText
        value={player.life}
        setValue={val => onSetLife(player.id, val)}
      />
      <PlayerName player={player} onUpdatePlayer={onUpdatePlayer} />
    </StyledWrapper>
  );
};
