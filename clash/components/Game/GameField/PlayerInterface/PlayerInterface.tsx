import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import Hand from './Hand/Hand';

import styles from './PlayerInterface.module.css';

interface Props {
  player: Player;
}

const PlayerInterface = ({ player }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div>Graveyard</div>
      <Hand player={player} />
      <div>buttons</div>
    </div>
  );
};

export default PlayerInterface;
