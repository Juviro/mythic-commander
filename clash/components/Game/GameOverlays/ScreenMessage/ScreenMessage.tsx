import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';

import styles from './ScreenMessage.module.css';

const ScreenMessage = () => {
  const { gameState, player: self } = useContext(GameStateContext);
  const { onInitiateRematch } = useGameActions();
  const [message, setMessage] = useState('');
  const [displayReplayButton, setDisplayReplayButton] = useState(false);

  const hasGameStarted = gameState?.players.every(
    (player) => player.mulligan.cardsAccepted
  );

  useEffect(() => {
    if (!gameState?.phaseStopByPlayerId) {
      setMessage('');
      return;
    }

    const player = gameState.players.find(
      ({ id }) => id === gameState.phaseStopByPlayerId
    );
    const playerName = player!.id === self.id ? 'You' : player!.name;

    setMessage(`${playerName} requested priority`);
  }, [gameState?.phaseStopByPlayerId]);

  useEffect(() => {
    if (!gameState || !hasGameStarted || gameState?.winner) return;

    const activePlayer = gameState.players.find(
      (player) => player.id === gameState.activePlayerId
    )!;

    setMessage(`It's ${activePlayer.name}'s Turn`);
  }, [gameState?.activePlayerId, hasGameStarted]);

  useEffect(() => {
    if (!gameState?.winner) {
      setMessage('');
      setDisplayReplayButton(false);
      return;
    }
    const winnerName = gameState.winner === self.name ? 'You' : gameState.winner;

    setMessage(`${winnerName} won the Game!`);

    setTimeout(() => {
      setDisplayReplayButton(true);
    }, 3000);
  }, [gameState?.winner]);

  if (!message) return null;

  const isHost = self?.id === gameState?.hostId;

  return (
    <div className={styles.wrapper} key={message}>
      <h1
        className={classNames(styles.message, {
          [styles.message__winner]: gameState?.winner,
        })}
      >
        {message}
      </h1>
      {isHost && (
        <Button
          type="primary"
          onClick={onInitiateRematch}
          className={classNames(styles.rematch_button, {
            [styles.rematch_button__visible]: displayReplayButton,
          })}
        >
          Rematch
        </Button>
      )}
    </div>
  );
};

export default ScreenMessage;
