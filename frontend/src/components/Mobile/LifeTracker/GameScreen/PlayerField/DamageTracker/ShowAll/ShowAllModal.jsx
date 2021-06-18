import React, { useState, useContext } from 'react';
import { Modal } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import Player from './Player';
import FullscreenModalContext from '../../../../../../Provider/FullscreenModalProvider';

export default ({ playerDamage, onClose, playerId, onTrackDamage }) => {
  const [currentPlayerDamage, setCurrentPlayerDamage] = useState(playerDamage);
  const { getContainer } = useContext(FullscreenModalContext);

  const onSetDamage = (originId) => (damage) => {
    const newPlayerDamage = currentPlayerDamage.map((player) => {
      if (player.id !== originId) return player;

      return {
        ...player,
        damage,
      };
    });
    setCurrentPlayerDamage(newPlayerDamage);
  };

  const onSubmit = () => {
    onTrackDamage(playerId, currentPlayerDamage);
    onClose();
  };

  return (
    <Modal
      visible
      onCancel={onClose}
      closable={false}
      title="Track Damage"
      onOk={onSubmit}
      getContainer={getContainer}
    >
      <Flex direction="column">
        {currentPlayerDamage.map((player) => (
          <Player {...player} key={player.id} onSetDamage={onSetDamage(player.id)} />
        ))}
      </Flex>
    </Modal>
  );
};
