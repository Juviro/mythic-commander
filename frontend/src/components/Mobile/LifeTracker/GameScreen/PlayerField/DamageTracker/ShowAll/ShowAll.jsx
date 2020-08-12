import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { StyledDamageField } from '../DamageField';
import { useToggle } from '../../../../../../Hooks';
import ShowAllModal from './ShowAllModal';

export default ({ playerId, onTrackDamage, playerDamage }) => {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <>
      <StyledDamageField
        color="black"
        style={{ flex: 1, minHeight: 30 }}
        onClick={toggleIsOpen}
      >
        <EllipsisOutlined />
      </StyledDamageField>
      {isOpen && (
        <ShowAllModal
          playerDamage={playerDamage}
          playerId={playerId}
          onTrackDamage={onTrackDamage}
          onClose={toggleIsOpen}
        />
      )}
    </>
  );
};
