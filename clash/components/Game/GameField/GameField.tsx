import React, { useContext } from 'react';

import styles from './GameField.module.css';
import PlayerInterface from './PlayerInterface/PlayerInterface';
import GameStateContext from '../GameStateContext';

const GameField = () => {
  const { isInitialized } = useContext(GameStateContext);

  return (
    <div className={styles.wrapper}>
      {isInitialized ? <PlayerInterface /> : <h1>Loading Match...</h1>}
    </div>
  );
};

export default GameField;
