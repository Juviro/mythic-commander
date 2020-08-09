import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import useGameState from './useGameState';
import GameField from './GameField';
import { FullscreenModalProvider } from '../../../Provider/FullscreenModalProvider';

const GameScreen = ({ gameSettings, history }) => {
  const isValidGame = Boolean(gameSettings.numberOfPlayers);

  const { players, onSetLife, onUpdatePlayer, onTrackDamage } = useGameState(
    gameSettings
  );

  useEffect(() => {
    if (!isValidGame) history.push('/m/life-tracker');
  });

  if (!isValidGame) return null;

  return (
    <FullscreenModalProvider>
      <GameField
        players={players}
        onSetLife={onSetLife}
        onUpdatePlayer={onUpdatePlayer}
        onTrackDamage={onTrackDamage}
      />
    </FullscreenModalProvider>
  );
};

export default withRouter(GameScreen);
