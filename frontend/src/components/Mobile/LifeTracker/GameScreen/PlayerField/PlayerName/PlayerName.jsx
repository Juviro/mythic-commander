import React from 'react';
import styled from 'styled-components';

import EditName from './EditName';
import { useToggle } from '../../../../../Hooks';

const StyledNameWrapper = styled.div`
  font-size: 200%;
  color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 2px 2px 0px #333;
`;

const StyledName = styled.div`
  padding: 0 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ({ player, onUpdatePlayer }) => {
  const [isEditing, toggleIsEditing] = useToggle(false);

  return (
    <>
      <StyledNameWrapper>
        <StyledName onClick={toggleIsEditing}>{player.name}</StyledName>
      </StyledNameWrapper>
      {isEditing && (
        <EditName
          onClose={toggleIsEditing}
          player={player}
          onUpdatePlayer={onUpdatePlayer}
        />
      )}
    </>
  );
};
