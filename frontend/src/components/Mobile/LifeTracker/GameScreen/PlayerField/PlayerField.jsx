import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import PlayerName from './PlayerName';
import NumberField from '../../NumberField';
import { useWindowSize } from '../../../../Hooks';
import DamageTracker from './DamageTracker/DamageTracker';

const initialHeight = window.innerHeight;

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 100%;
  border: 1px solid black;
  background-color: ${({ color }) => color || '#f2f2f2'};

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
    minWidth &&
    css`
      min-width: ${minWidth};
    `}
  ${({ highlighted }) =>
    highlighted &&
    css`
      filter: saturate(170%) brightness(1.4);
    `}


  &:last-child {
    flex-direction: row-reverse;
  }
`;

export default ({
  player,
  players,
  onTrackDamage,
  numberOfPlayersInRow,
  onSetLife,
  onUpdatePlayer,
  displayDamage,
  highlighted,
}) => {
  useWindowSize();
  // prevent resize of player fields when keyboard expanded
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
      highlighted={highlighted}
      minWidth={
        numberOfPlayersInRow !== 1 && `${fullscreenHeight / numberOfPlayersInRow}px`
      }
    >
      {displayDamage && (
        <DamageTracker player={player} players={players} onTrackDamage={onTrackDamage} />
      )}
      <Flex
        direction="column"
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      >
        <NumberField
          whiteText
          value={player.life}
          setValue={(val) => onSetLife(player.id, val)}
        />
        <PlayerName player={player} onUpdatePlayer={onUpdatePlayer} />
      </Flex>
    </StyledWrapper>
  );
};
