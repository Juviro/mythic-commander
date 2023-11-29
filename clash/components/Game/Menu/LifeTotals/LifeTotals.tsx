import React, { CSSProperties, useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import classNames from 'classnames';
import styles from './LifeTotals.module.css';

const LifeTotals = () => {
  const { gameState } = useContext(GameStateContext);

  return (
    <div className={styles.wrapper}>
      {gameState?.players.map((player) => (
        <div
          key={player.id}
          className={classNames(styles.player, {
            [styles.player__active]: player.id === gameState?.activePlayerId,
          })}
          style={
            { '--player-color': `var(--color-player-${player.id})` } as CSSProperties
          }
        >
          <div className={styles.life}>
            <span>{player.life}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LifeTotals;
