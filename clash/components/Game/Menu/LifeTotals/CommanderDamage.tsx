import React, { useContext } from 'react';

import { Player } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';

import styles from './LifeTotals.module.css';

interface Props {
  player: Player;
}

const CommanderDamage = ({ player }: Props) => {
  const { gameState, player: self } = useContext(GameStateContext);
  console.log('gameState', gameState);

  return (
    <div className={styles.commander_damage}>
      <div>Commander Damage</div>
    </div>
  );
};

export default CommanderDamage;
