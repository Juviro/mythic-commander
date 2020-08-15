import React, { useState, useContext } from 'react';
import { Modal } from 'antd';

import NumberField from '../../../../NumberField';
import DamageFieldBackground from './DamageFieldBackground';
import { Flex } from '../../../../../../Elements/Shared';
import FullscreenModalContext from '../../../../../../Provider/FullscreenModalProvider';

export default ({ onSubmit, damage, onCancel, player }) => {
  const originName = player?.name ?? 'Infect';
  const [currentDamage, setCurrentDamage] = useState(damage);
  const { getContainer } = useContext(FullscreenModalContext);

  const onOk = () => {
    onSubmit(currentDamage);
  };

  return (
    <Modal
      visible
      getContainer={getContainer}
      title={`Track Damage from ${originName}`}
      onCancel={onCancel}
      onOk={onOk}
      bodyStyle={{ padding: 0 }}
      style={{ maxWidth: 340 }}
    >
      <DamageFieldBackground width="100%" height="100%" isInfect={!player} {...player}>
        <Flex style={{ padding: 24, width: '100%' }}>
          <NumberField value={currentDamage} setValue={setCurrentDamage} minValue={0} />
        </Flex>
      </DamageFieldBackground>
    </Modal>
  );
};
