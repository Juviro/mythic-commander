import React from 'react';
import styled from 'styled-components';
import { useToggle } from '../../../../../../Hooks';
import DamageModal from './DamageModal';
import DamageFieldBackground from './DamageFieldBackground';

export const DAMAGE_FIELD_SIZE = 50;

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

export default ({ ownId, id, name, damage, onTrackDamage, players }) => {
  const [isEditing, toggleIsEditing] = useToggle();
  const player = players.find(({ id: playerId }) => playerId === id);

  const onSubmit = (newDamage) => {
    onTrackDamage(ownId, [{ damage: newDamage, id }]);
    toggleIsEditing(false);
  };

  return (
    <>
      <DamageFieldBackground
        color={player?.color}
        img={player?.img}
        height={DAMAGE_FIELD_SIZE}
        width={DAMAGE_FIELD_SIZE}
        isInfect={!player}
        onClick={toggleIsEditing}
      >
        <StyledDamage>{damage}</StyledDamage>
        <StyledName>{name}</StyledName>
      </DamageFieldBackground>
      {isEditing && (
        <DamageModal
          id={id}
          damage={damage}
          onSubmit={onSubmit}
          player={player}
          onCancel={toggleIsEditing}
        />
      )}
    </>
  );
};
