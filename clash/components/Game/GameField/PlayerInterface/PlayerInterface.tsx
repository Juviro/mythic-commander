import React, { CSSProperties } from 'react';

import { Player } from 'backend/database/gamestate.types';
import Hand from './Hand/Hand';
import Library from './Library/Library';

import styles from '../GameInterfaces.module.css';

interface Props {
  player: Player;
}

const PlayerInterface = ({ player }: Props) => {
  return (
    <div
      className={styles.interface}
      style={{ '--player-color': player.color } as CSSProperties}
    >
      <Library player={player} />
      <Hand player={player} />
      <div />
    </div>
  );
};

export default PlayerInterface;
