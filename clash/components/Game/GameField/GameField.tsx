import React, { useContext } from 'react';

import styles from './GameField.module.css';
import GameStateContext from '../GameStateContext';
import GameInterfaces from './GameInterfaces';

const GameField = () => {
  const { isInitialized } = useContext(GameStateContext);

  return (
    <div className={styles.wrapper}>
      {isInitialized ? <GameInterfaces /> : <h1>Loading Match...</h1>}
    </div>
  );
};

export default GameField;
