import React from 'react';
import styled, { css } from 'styled-components';
import { Prompt } from 'react-router';
import { withRouter } from 'react-router-dom';
import PlayerField from './PlayerField/PlayerField';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
`;

const halfStyles = {
  right: css`
    transform: rotate(270deg) translate(25vw, -25vw);
    transform-origin: right;
    margin-left: calc(100vw - 100vh);
  `,
  left: css`
    transform: rotate(90deg) translate(-25vw, -25vw);
    transform-origin: left;
  `,
  top: css`
    transform: rotate(180deg) translate(0vw, 0vw);
    transform-origin: center;
    width: 100%;
    height: 50%;
  `,
  bottom: css`
    transform: translate(0vw, 100%);
    width: 100%;
    height: 50%;
  `,
};

const StyledHalf = styled.div`
  width: 100vh;
  height: 50vw;

  display: flex;
  position: absolute;
  flex-direction: row;

  ${({ position }) => halfStyles[position]}
`;

const GameScreen = ({
  players,
  onSetLife,
  onUpdatePlayer,
  onTrackDamage,
  displayDamage,
}) => {
  const is2Player = players.length === 2;
  const [position1, position2] = is2Player ? ['top', 'bottom'] : ['left', 'right'];

  const leftSidePlayers = players.filter((_, index) => index / players.length < 0.5);
  const rightSidePlayers = players.filter((_, index) => index / players.length >= 0.5);

  return (
    <StyledWrapper>
      <Prompt when message="Are you sure you want to leave the game?" />
      <StyledHalf position={position1}>
        {leftSidePlayers.map(player => (
          <PlayerField
            onSetLife={onSetLife}
            player={player}
            key={player.id}
            numberOfPlayersInRow={leftSidePlayers.length}
            players={players}
            onTrackDamage={onTrackDamage}
            onUpdatePlayer={onUpdatePlayer}
            displayDamage={displayDamage}
          />
        ))}
      </StyledHalf>
      <StyledHalf position={position2} reverse>
        {rightSidePlayers.map(player => (
          <PlayerField
            onSetLife={onSetLife}
            player={player}
            key={player.id}
            numberOfPlayersInRow={rightSidePlayers.length}
            players={players}
            onTrackDamage={onTrackDamage}
            onUpdatePlayer={onUpdatePlayer}
            displayDamage={displayDamage}
          />
        ))}
      </StyledHalf>
    </StyledWrapper>
  );
};

export default withRouter(GameScreen);
