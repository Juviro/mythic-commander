import React, { useContext, useEffect, useMemo, useState } from 'react';

import DraggableModal from 'components/GameComponents/DraggableModal/DraggableModal';
import useSettings from '../../Menu/GameInfo/GuideModal/Settings/useSettings';
import GameStateContext from '../../GameStateContext';
import { TIPS } from './tips';

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

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * TIPS.length);
    return TIPS[randomIndex];
  };

  const tipOfTheDay = useMemo(getRandomTip, []);

  if (!isInitialized) return null;
  if (!player.mulligan.cardsAccepted) return null;

  if (!open) return null;

  return (
    <DraggableModal
      title="Tip of the day"
      headerColor="primary"
      onClose={() => setOpen(false)}
    >
      {tipOfTheDay}
    </DraggableModal>
  );
};

export default TipOfTheDay;
