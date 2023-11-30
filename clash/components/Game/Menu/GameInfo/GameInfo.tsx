import React, { useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import { Button } from 'antd';
import styles from './GameInfo.module.css';

const GameInfo = () => {
  const { gameState, player } = useContext(GameStateContext);
  const { restartGame } = useGameActions();

  const canRestartGame = player?.id === gameState!.hostId;

  const onRestartGame = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const shouldRestart = confirm('Are you sure you want to restart the game?');
    if (!shouldRestart) return;
    restartGame();
  };

  return (
    <div className={styles.wrapper}>
      <div>{`Turn ${gameState?.turn}`}</div>
      {canRestartGame && (
        <Button ghost onClick={onRestartGame}>
          Restart Game
        </Button>
      )}
    </div>
  );
};

export default GameInfo;
