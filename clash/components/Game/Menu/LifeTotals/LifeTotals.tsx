import React, { CSSProperties, useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import classNames from 'classnames';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import useGameActions from 'components/Game/useGameActions';
import styles from './LifeTotals.module.css';

const LifeTotals = () => {
  const { gameState } = useContext(GameStateContext);

  const { setPlayerLife } = useGameActions();

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
          <div className={styles.buttons}>
            <MinusOutlined onClick={() => setPlayerLife(player.id, player.life - 1)} />
            <PlusOutlined onClick={() => setPlayerLife(player.id, player.life + 1)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LifeTotals;
