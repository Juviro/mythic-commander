import React, { useContext, useEffect, useState } from 'react';

import { Player } from 'backend/database/gamestate.types';
import styles from './ScreenMessage.module.css';
import GameStateContext from '../GameStateContext';

const ScreenMessage = () => {
  const { gameState } = useContext(GameStateContext);
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);

  const hasGameStarted = gameState?.players.every(
    (player) => player.mulligan.cardsAccepted
  );

  useEffect(() => {
    if (!gameState) return;
    if (!hasGameStarted) return;

    const newActivePlayer = gameState.players.find(
      (player) => player.id === gameState.activePlayerId
    );

    setActivePlayer(newActivePlayer!);
  }, [gameState?.activePlayerId, hasGameStarted]);

  if (!activePlayer) return null;

  const message = `It's ${activePlayer.name}'s Turn`;

  return (
    <div className={styles.wrapper} key={activePlayer.id}>
      <h1 className={styles.message}>{message}</h1>
    </div>
  );
};

export default ScreenMessage;
