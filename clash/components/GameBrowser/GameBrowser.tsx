import React from 'react';

import styles from './GameBrowser.module.css';
import GameList from './GameList/GameList';
import HostGame from './HostGame/HostGame';
import useGameBrowser from './useGameBrowser';

const GameBrowser = () => {
  const { user, games, onHostGame } = useGameBrowser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.browser}>
          <h1 className={styles.title}>Game Browser</h1>
          <GameList games={games} />
        </div>
        <HostGame user={user} onHostGame={onHostGame} />
      </div>
    </div>
  );
};

export default GameBrowser;
