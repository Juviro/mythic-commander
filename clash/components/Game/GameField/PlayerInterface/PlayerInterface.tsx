import React from 'react';

import Hand from './Hand/Hand';

import styles from './PlayerInterface.module.css';

const PlayerInterface = () => {
  return (
    <div className={styles.wrapper}>
      <div>Graveyard</div>
      <Hand />
      <div>buttons</div>
    </div>
  );
};

export default PlayerInterface;
