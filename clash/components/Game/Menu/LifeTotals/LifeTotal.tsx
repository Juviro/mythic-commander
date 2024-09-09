import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import PlusMinus from 'components/lib/PlusMinus/PlusMinus';
import CommanderDamage from './CommanderDamage';

import styles from './LifeTotals.module.css';

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
      <PlusMinus
        amount={player.life}
        onChange={(delta) => onChangeLife(player, delta)}
        size="large"
      />
    </>
  );
};

export default LifeTotal;
