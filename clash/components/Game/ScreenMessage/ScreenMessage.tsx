import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import useSound from 'hooks/useSound';
import GameStateContext from '../GameStateContext';

import styles from './ScreenMessage.module.css';

const ScreenMessage = () => {
  const { gameState, player: self, hasGameStarted } = useContext(GameStateContext);
  const [message, setMessage] = useState('');
  // const [playSound] = useSound('ACTIVE_PLAYER');

  useEffect(() => {
    if (!gameState || !hasGameStarted || gameState?.winner) return;

    const activePlayer = gameState.players.find(
      (player) => player.id === gameState.activePlayerId
    )!;

    const isSelf = activePlayer.id === self.id;
    const playerName = isSelf ? 'Your' : `${activePlayer.name}'s`;

    setMessage(`It's ${playerName} Turn`);

    if (isSelf) {
      // playSound();
    }
  }, [gameState?.activePlayerId, hasGameStarted]);

  useEffect(() => {
    if (!gameState?.winner) {
      setMessage('');
      return;
    }
    const winnerName = gameState.winner === self.name ? 'You' : gameState.winner;

    setMessage(`${winnerName} won the Game!`);
  }, [gameState?.winner]);

  if (!message) return null;

  return (
    <div className={styles.wrapper} key={message}>
      <h1
        className={classNames(styles.message, {
          [styles.message__winner]: gameState?.winner,
        })}
      >
        {message}
      </h1>
    </div>
  );
};

export default ScreenMessage;
