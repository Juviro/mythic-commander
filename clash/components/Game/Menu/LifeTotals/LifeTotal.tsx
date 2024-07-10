import React from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import LongPress from 'components/GameComponents/LongPress/LongPress';
import { Player } from 'backend/database/gamestate.types';
import styles from './LifeTotals.module.css';
import CommanderDamage from './CommanderDamage';

interface LifeTotalProps {
  player: Player;
  onChangeLife: (player: Player, lifeDelta: number) => () => void;
}

const LifeTotal = ({ player, onChangeLife }: LifeTotalProps) => {
  if (player.resigned) {
    return <div className={styles.defeated}>Defeated</div>;
  }

  return (
    <>
      <CommanderDamage player={player} />
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
  );
};

export default LifeTotal;
