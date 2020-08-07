import React from 'react';
import styled from 'styled-components';

import PlayerName from './PlayerName';
import NumberField from '../../NumberField';
import { Flex } from '../../../../Elements/Shared';
import { lifeTrack } from '../../../../../constants/colors';

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  border: 1px solid black;
  background-color: ${({ playerIndex }) => lifeTrack[playerIndex]};

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(https://cdnb.artstation.com/p/assets/images/images/027/681/525/large/paul-canavan-414596-felineincarnations-full.jpg?1592245465);
`;

export default ({ player, players, onSetLife, onChangeName }) => {
  const playerIndex = players.findIndex(({ id }) => id === player.id);
  return (
    <StyledWrapper playerIndex={playerIndex}>
      <NumberField
        whiteText
        value={player.life}
        setValue={val => onSetLife(player.id, val)}
      />
      <PlayerName player={player} onChangeName={onChangeName} />
    </StyledWrapper>
  );
};
