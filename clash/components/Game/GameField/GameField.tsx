import React, { useContext } from 'react';

import styles from './GameField.module.css';
import GameStateContext from '../GameStateContext';
import PlayerInterfaces from './PlayerInterfaces';

const GameField = () => {
  const { isInitialized } = useContext(GameStateContext);

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper} onContextMenu={onContextMenu}>
      {isInitialized ? <PlayerInterfaces /> : <h1>Loading Match...</h1>}
    </div>
  );
};

export default GameField;
