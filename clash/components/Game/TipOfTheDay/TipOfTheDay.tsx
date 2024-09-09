import React, { useContext, useState } from 'react';
import { Modal } from 'antd';

import useSettings from '../Menu/GameInfo/GuideModal/Settings/useSettings';
import GameStateContext from '../GameStateContext';
import { TIPS } from './tips';

const TipOfTheDay = () => {
  const [settings] = useSettings();
  const { isInitialized, player } = useContext(GameStateContext);

  const [open, setOpen] = useState(settings.displayTipOfTheDay);

  if (!isInitialized) return null;
  if (!player.mulligan.cardsAccepted) return null;

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * TIPS.length);
    return TIPS[randomIndex];
  };

  return (
    <Modal
      open={open}
      closable
      onCancel={() => setOpen(false)}
      footer={null}
      mask={false}
      title="Tip of the day"
      destroyOnClose
      style={{ top: 48 }}
    >
      {getRandomTip()}
    </Modal>
  );
};

export default TipOfTheDay;
