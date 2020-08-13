import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { useToggle } from '../../../../../../Hooks';
import ShowAllModal from './ShowAllModal';
import DamageFieldBackground from '../DamageField/DamageFieldBackground';

export default ({ playerId, onTrackDamage, playerDamage }) => {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <>
      <DamageFieldBackground
        color="black"
        height={50}
        width={50}
        style={{ flex: 1, minHeight: 30 }}
        onClick={toggleIsOpen}
      >
        <EllipsisOutlined />
      </DamageFieldBackground>
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
