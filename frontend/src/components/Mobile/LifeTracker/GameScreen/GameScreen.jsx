import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useGameState from './useGameState';
import GameField from './GameField';
import { FullscreenModalProvider } from '../../../Provider/FullscreenModalProvider';
import Menu from './Menu';
import { LoadingScreen } from './LoadingScreen';
import usePreventScreenLock from '../../../../hooks/usePreventScreenLock';
import LifeTrackerContext from '../LifeTrackerContext';

const GameScreen = ({ handle }) => {
  const history = useHistory();
  usePreventScreenLock();

  const {
    gameState: initialGameState,
    setGameState,
    gameSettings,
  } = useContext(LifeTrackerContext);

  const displayDamage = gameSettings?.displayDamage;

  const {
    players,
    onSetLife,
    isLoading,
    onUpdatePlayer,
    onTrackDamage,
    onRestartGame,
    highlightedPlayerId,
  } = useGameState(gameSettings, initialGameState);

  const isValidGame = Boolean(players?.length || initialGameState?.players?.length);

  useEffect(() => {
    if (isValidGame) return;
    history.push(`/m/life-tracker`);
  }, []);

  useEffect(() => {
    setGameState({
      ...initialGameState,
      players,
    });
  }, [players]);

  if (!players?.length) return null;

  if (isLoading) return <LoadingScreen />;

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

export default GameScreen;
