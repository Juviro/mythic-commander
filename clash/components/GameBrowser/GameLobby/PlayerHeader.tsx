import React from 'react';

import styles from './PlayerHeader.module.css';

const PlayerHeader = () => {
  return (
    <div className={styles.wrapper}>
      <span>Player</span>
      <span>Deck</span>
      <span className={styles.ready}>Ready</span>
    </div>
  );
};

export default PlayerHeader;
