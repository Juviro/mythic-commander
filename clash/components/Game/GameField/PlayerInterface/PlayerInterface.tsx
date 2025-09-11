import React, { CSSProperties } from 'react';

import { Player } from 'backend/database/gamestate.types';
import Hand from './Hand/Hand';
import Library from './Library/Library';

import styles from '../PlayerInterfaces.module.css';
import Graveyard from './Graveyard/Graveyard';
import Battlefield from './Battlefield/Battlefield';
import Exile from './Exile/Exile';
import Mulligan from './Mulligan/Mulligan';
import EmoteSelection from './EmoteSelection/EmoteSelection';
import PlayerEmote from './PlayerEmote/PlayerEmote';

interface Props {
  player: Player;
  isSelf?: boolean;
  isFlipped: boolean;
}

const PlayerInterface = ({ player, isSelf, isFlipped }: Props) => {
  return (
    <div
      className={styles.interface_wrapper}
      style={{ '--player-color': player.color } as CSSProperties}
    >
      <Battlefield player={player} isFlipped={isFlipped} isSelf={isSelf} />
      <div className={styles.interface}>
        <Graveyard player={player} />
        <Library player={player} isSelf={isSelf} />
        {player.mulligan.cardsAccepted ? (
          <Hand player={player} isSelf={isSelf} />
        ) : (
          <Mulligan player={player} isSelf={isSelf} />
        )}
        {isSelf && <EmoteSelection />}
        <PlayerEmote player={player} />
        <Exile player={player} />
        <div />
      </div>
    </div>
  );
};

export default PlayerInterface;
