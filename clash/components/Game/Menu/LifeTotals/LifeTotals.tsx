import React, { useContext } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';

import styles from './LifeTotals.module.css';

const LifeTotals = () => {
  const { gameState } = useContext(GameStateContext);

  const { setPlayerLife } = useGameActions();

  return (
    <div className={styles.wrapper}>
      {gameState?.players.map((player) => (
        <div key={player.id} className={styles.player}>
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
