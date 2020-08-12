import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import useGameState from './useGameState';
import GameField from './GameField';
import { FullscreenModalProvider } from '../../../Provider/FullscreenModalProvider';
import Menu from './Menu';

const GameScreen = ({ gameSettings, history, handle }) => {
  const isValidGame = Boolean(gameSettings.numberOfPlayers);

  const {
    players,
    onSetLife,
    onUpdatePlayer,
    onTrackDamage,
    onRestartGame,
  } = useGameState(gameSettings);

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
      <Menu handle={handle} onRestartGame={onRestartGame} />
    </FullscreenModalProvider>
  );
};

export default withRouter(GameScreen);
