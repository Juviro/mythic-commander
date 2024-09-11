import React, { useContext, useEffect, useState } from 'react';

import useSettings from '../Menu/GameInfo/GuideModal/Settings/useSettings';
import GameStateContext from '../GameStateContext';
import { TIPS } from './tips';
import DraggableModal from '../DraggableModal/DraggableModal';

const DISPLAY_DURATION_S = 15;

const TipOfTheDay = () => {
  const [settings] = useSettings();
  const { isInitialized, player } = useContext(GameStateContext);

  const [open, setOpen] = useState(settings.displayTipOfTheDay);

  useEffect(() => {
    if (!settings.displayTipOfTheDay) return;

    setTimeout(() => {
      setOpen(false);
    }, DISPLAY_DURATION_S * 1000);
  }, []);

  if (!isInitialized) return null;
  if (!player.mulligan.cardsAccepted) return null;

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * TIPS.length);
    return TIPS[randomIndex];
  };

  if (!open) return null;

  return (
    <DraggableModal
      title="Tip of the day"
      headerColor="primary"
      onClose={() => setOpen(false)}
    >
      {getRandomTip()}
    </DraggableModal>
  );
};

export default TipOfTheDay;
