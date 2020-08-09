import React from 'react';
import styled from 'styled-components';

import EditName from './EditName';
import { useToggle } from '../../../../../Hooks';

const StyledName = styled.div`
  font-size: 200%;
  color: #fff;
  width: 100%;
  text-align: center;
  text-shadow: 2px 2px 0px #333;
`;

export default ({ player, onUpdatePlayer }) => {
  const [isEditing, toggleIsEditing] = useToggle(false);

  return (
    <>
      <StyledName onClick={toggleIsEditing}>{player.name}</StyledName>
      <EditName
        visible={isEditing}
        onClose={toggleIsEditing}
        player={player}
        onUpdatePlayer={onUpdatePlayer}
      />
    </>
  );
};
