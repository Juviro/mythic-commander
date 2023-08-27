import React, { CSSProperties } from 'react';

import { Player } from 'backend/database/gamestate.types';
import Hand from './Hand/Hand';
import Library from './Library/Library';

import styles from '../PlayerInterfaces.module.css';
import Graveyard from './Graveyard/Graveyard';

interface Props {
  player: Player;
}

const PlayerInterface = ({ player }: Props) => {
  return (
    <div
      className={styles.interface}
      style={{ '--player-color': player.color } as CSSProperties}
    >
      <Graveyard player={player} />
      <Library player={player} />
      <Hand player={player} />
      <div />
    </div>
  );
};

export default PlayerInterface;
