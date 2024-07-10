import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import styles from './LifeTotals.module.css';
import CommanderDamage from './CommanderDamage';
import LifeButtons from './LifeButtons';

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
      <LifeButtons
        amount={player.life}
        onChangeLife={(delta) => onChangeLife(player, delta)}
      />
    </>
  );
};

export default LifeTotal;
