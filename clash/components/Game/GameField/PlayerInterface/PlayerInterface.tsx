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
  isFlipped?: boolean;
}

const PlayerInterface = ({ player, isSelf, isFlipped }: Props) => {
  return (
    <div
      className={styles.interface_wrapper}
      style={{ '--player-color': player.color } as CSSProperties}
    >
      <Battlefield player={player} isFlipped={isFlipped} />
      <div className={styles.interface}>
        <Graveyard player={player} isSelf={isSelf} />
        <Library player={player} isSelf={isSelf} />
        <Hand player={player} isSelf={isSelf} />
        <div />
      </div>
    </div>
  );
};

export default PlayerInterface;
