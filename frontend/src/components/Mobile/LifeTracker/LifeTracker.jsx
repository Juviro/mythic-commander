import React, { useState } from 'react';

import { useToggle } from '../../Hooks';
import StartingScreen from './StartingScreen';
import GameScreen from './GameScreen';

export default () => {
  const [gameSettings, setGameSettings] = useState({});
  const [hasStared, setHasStarted] = useToggle(false);

  const onStart = newGameSettings => {
    setGameSettings(newGameSettings);
    setHasStarted(true);
  };

  if (!hasStared) {
    return <StartingScreen onStart={onStart} />;
  }

  return <GameScreen gameSettings={gameSettings} />;
};
