import React, { useRef } from 'react';

import { Player } from 'backend/database/gamestate.types';
import styles from './Battlefield.module.css';
import BattlefieldCard from './BattlefieldCard';
import BattlefieldDropzone from './BattlefieldDropzone';
import BattlefieldSelection from './BattlefieldSelection';

interface Props {
  player: Player;
  isFlipped?: boolean;
}

const Battlefield = ({ player, isFlipped }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const cards = player.zones.battlefield;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <BattlefieldSelection>
        <BattlefieldDropzone
          player={player}
          isFlipped={isFlipped}
          wrapperRef={wrapperRef}
        >
          {cards.map((card) => (
            <BattlefieldCard card={card} key={card.clashId} />
          ))}
        </BattlefieldDropzone>
      </BattlefieldSelection>
    </div>
  );
};

export default Battlefield;
