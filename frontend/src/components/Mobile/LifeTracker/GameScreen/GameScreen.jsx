import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';

import useGameState from './useGameState';
import GameField from './GameField';
import { FullscreenModalProvider } from '../../../Provider/FullscreenModalProvider';
import Menu from './Menu';

const GameScreen = ({ gameSettings, history, handle, displayDamage }) => {
  const isValidGame = Boolean(gameSettings.numberOfPlayers);

  useBeforeunload(() => 'Are you sure you want to leave the game?');

  const {
    players,
    onSetLife,
    onUpdatePlayer,
    onTrackDamage,
    onRestartGame,
    highlightedPlayerId,
  } = useGameState(gameSettings);

  useEffect(() => {
    if (!isValidGame) history.push('/m/life-tracker');
  });

  if (!isValidGame) return null;

  return (
    <FullscreenModalProvider>
      <GameField
        players={players}
        displayDamage={displayDamage}
        onSetLife={onSetLife}
        onUpdatePlayer={onUpdatePlayer}
        onTrackDamage={onTrackDamage}
        highlightedPlayerId={highlightedPlayerId}
      />
      <Menu handle={handle} onRestartGame={onRestartGame} />
    </FullscreenModalProvider>
  );
};

export default withRouter(GameScreen);
