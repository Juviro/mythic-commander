import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import useGameState from './useGameState';
import GameField from './GameField';

const GameScreen = ({ gameSettings, history }) => {
  const isValidGame = Boolean(gameSettings.numberOfPlayers);

  const { players, onSetLife, onChangeName, onTrackDamage } = useGameState(gameSettings);

  useEffect(() => {
    if (!isValidGame) history.push('/m/life-tracker');
  }, []);

  if (!isValidGame) return null;

  return (
    <GameField
      players={players}
      onSetLife={onSetLife}
      onChangeName={onChangeName}
      onTrackDamage={onTrackDamage}
    />
  );
};

export default withRouter(GameScreen);
