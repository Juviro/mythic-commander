import React, { useState, useContext } from 'react';
import { Modal } from 'antd';

import Flex from 'components/Elements/Shared/Flex';
import NumberField from '../../../../NumberField';
import DamageFieldBackground from './DamageFieldBackground';
import FullscreenModalContext from '../../../../../../Provider/FullscreenModalProvider';

const DamageModal = ({ onSubmit, damage, onCancel, player }) => {
  const originName = player?.name ?? 'Infect';
  const [currentDamage, setCurrentDamage] = useState(damage);
  const { getContainer } = useContext(FullscreenModalContext);

  const onOk = () => {
    onSubmit(currentDamage);
  };

  return (
    <Modal
      open
      getContainer={getContainer}
      title={`Track Damage from ${originName}`}
      onCancel={onOk}
      onOk={onOk}
      styles={{
        body: { padding: 0 },
      }}
      cancelButtonProps={{
        onClick: onCancel,
      }}
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

export default DamageModal;
