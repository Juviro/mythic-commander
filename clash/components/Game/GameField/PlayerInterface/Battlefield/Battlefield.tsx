import React, { useRef } from 'react';

import { Player } from 'backend/database/gamestate.types';
import BattlefieldCard from './BattlefieldCard';
import BattlefieldDropzone from './BattlefieldDropzone';
import BattlefieldSelection from './BattlefieldSelection/BattlefieldSelection';
import { BattlefieldSelectionContextProvider } from './BattlefieldSelection/BattlefieldSelectionContext';

import styles from './Battlefield.module.css';

interface Props {
  player: Player;
  isFlipped: boolean;
}

const Battlefield = ({ player, isFlipped }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const cards = player.zones.battlefield;

  return (
    <BattlefieldSelectionContextProvider player={player}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <BattlefieldSelection isFlipped={isFlipped}>
          <BattlefieldDropzone
            player={player}
            isFlipped={isFlipped}
            wrapperRef={wrapperRef}
          >
            {cards.map((card) => (
              <BattlefieldCard card={card} key={card.clashId} player={player} />
            ))}
          </BattlefieldDropzone>
        </BattlefieldSelection>
      </div>
    </BattlefieldSelectionContextProvider>
  );
};

export default Battlefield;
