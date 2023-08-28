import React, { CSSProperties } from 'react';

import { Player } from 'backend/database/gamestate.types';
import Hand from './Hand/Hand';
import Library from './Library/Library';

import styles from '../PlayerInterfaces.module.css';
import Graveyard from './Graveyard/Graveyard';
import Battlefield from './Battlefield/Battlefield';

interface Props {
  player: Player;
  isSelf?: boolean;
}

const PlayerInterface = ({ player, isSelf }: Props) => {
  return (
    <div className={styles.interface_wrapper}>
      <Battlefield player={player} />
      <div
        className={styles.interface}
        style={{ '--player-color': player.color } as CSSProperties}
      >
        <Graveyard player={player} />
        <Library player={player} />
        <Hand player={player} isSelf={isSelf} />
        <div />
      </div>
    </div>
  );
};

export default PlayerInterface;
