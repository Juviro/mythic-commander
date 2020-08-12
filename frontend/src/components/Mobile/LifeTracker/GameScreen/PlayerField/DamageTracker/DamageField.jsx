import React from 'react';
import styled, { css } from 'styled-components';
import { POISON_IMAGE } from '../PlayerName/Avatar';

export const DAMAGE_FIELD_SIZE = 50;

export const StyledDamageField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: ${DAMAGE_FIELD_SIZE}px;
  height: ${DAMAGE_FIELD_SIZE}px;
  max-height: ${DAMAGE_FIELD_SIZE}px;
  border: 1px solid black;
  background-color: ${({ color }) => color};

  color: #fff;
  text-shadow: 2px 2px 0px #333;

  ${({ img }) =>
    img
      ? css`
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(${img});
        `
      : ''}
    ${({ isInfect }) =>
      isInfect
        ? css`
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0px -16px;
            background-image: url(${POISON_IMAGE});
          `
        : ''}
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth};
    `}
`;

const StyledDamage = styled.span`
  font-size: 30px;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const StyledName = styled.span`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export default ({ id, name, damage, onTrackDamage, players }) => {
  const player = players.find(({ id: playerId }) => playerId === id);

  return (
    <StyledDamageField color={player?.color} img={player?.img} isInfect={!player}>
      <StyledDamage>{damage}</StyledDamage>
      <StyledName>{name}</StyledName>
    </StyledDamageField>
  );
};
