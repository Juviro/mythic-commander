import React, { CSSProperties } from 'react';

import { Player } from 'backend/database/gamestate.types';
import Hand from './Hand/Hand';

import styles from './PlayerInterface.module.css';

interface Props {
  player: Player;
}

const PlayerInterface = ({ player }: Props) => {
  return (
    <div
      className={styles.wrapper}
      style={{ '--player-color': player.color } as CSSProperties}
    >
      <div>Graveyard</div>
      <Hand player={player} />
      <div>buttons</div>
    </div>
  );
};

export default PlayerInterface;
