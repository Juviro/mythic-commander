import React, { useContext } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';

import LongPress from 'components/GameComponents/LongPress/LongPress';
import { Player } from 'backend/database/gamestate.types';
import styles from './LifeTotals.module.css';

const LifeTotals = () => {
  const { gameState } = useContext(GameStateContext);

  const { setPlayerLife } = useGameActions();

  const onChangeLife = (player: Player, lifeDelta: number) => () => {
    setPlayerLife(player.id, player.life + lifeDelta);
  };

  return (
    <div className={styles.wrapper}>
      {gameState?.players.map((player) => (
        <div key={player.id} className={styles.player}>
          {player.resigned ? (
            <div className={styles.defeated}>Defeated</div>
          ) : (
            <>
              <div className={styles.life}>
                <span>{player.life}</span>
              </div>
              <div className={styles.buttons}>
                <LongPress
                  onLongPress={onChangeLife(player, -10)}
                  onPress={onChangeLife(player, -1)}
                >
                  <MinusOutlined />
                </LongPress>
                <LongPress
                  onLongPress={onChangeLife(player, 10)}
                  onPress={onChangeLife(player, 1)}
                >
                  <PlusOutlined />
                </LongPress>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default LifeTotals;
