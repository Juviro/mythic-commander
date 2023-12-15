import React, { useRef } from 'react';

import { Player } from 'backend/database/gamestate.types';
import useShortcut from 'hooks/useShortcut';
import SHORTCUTS from 'constants/shortcuts';
import useGameActions from 'components/Game/useGameActions';
import BattlefieldCard from './BattlefieldCard';
import BattlefieldDropzone from './BattlefieldDropzone';
import BattlefieldSelection from './BattlefieldSelection/BattlefieldSelection';
import { BattlefieldSelectionContextProvider } from './BattlefieldSelection/BattlefieldSelectionContext';

import styles from './Battlefield.module.css';

interface Props {
  player: Player;
  isSelf?: boolean;
  isFlipped: boolean;
}

const Battlefield = ({ player, isFlipped, isSelf }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { onTapCards } = useGameActions();

  const cards = player.zones.battlefield;

  const untapCards = () => {
    onTapCards({
      cardIds: cards.map((card) => card.clashId),
      playerId: player.id,
      tapped: false,
    });
  };

  useShortcut(SHORTCUTS.UNTAP, untapCards, {
    disabled: !isSelf,
  });

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
