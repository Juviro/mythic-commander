import React, { useContext, useRef } from 'react';

import { Player } from 'backend/database/gamestate.types';
import useShortcut from 'hooks/useShortcut';
import SHORTCUTS from 'constants/shortcuts';
import useGameActions from 'components/Game/useGameActions';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import classNames from 'classnames';
import CardPositionContext from 'components/Game/CardPositionContext';
import BattlefieldCard from './BattlefieldCard/BattlefieldCard';
import BattlefieldDropzone from './BattlefieldDropzone/BattlefieldDropzone';
import BattlefieldSelection from './BattlefieldSelection/BattlefieldSelection';
import { BattlefieldSelectionContextProvider } from './BattlefieldSelection/BattlefieldSelectionContext';

import styles from './Battlefield.module.css';
import useBattlefieldActions from './battlefieldActions/useBattlefieldActions';

interface Props {
  player: Player;
  isSelf?: boolean;
  isFlipped: boolean;
}

const Battlefield = ({ player, isFlipped, isSelf }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { contextMenuPosition } = useContext(CardPositionContext);

  const cards = player.zones.battlefield;

  const { onTapCards } = useGameActions();
  const battlefieldActions = useBattlefieldActions({
    cards,
    player,
    battlefieldRef: wrapperRef,
  });

  const untapCards = () => {
    onTapCards({
      cardIds: cards.map((card) => card.clashId),
      battlefieldPlayerId: player.id,
      tapped: false,
    });
  };

  useShortcut(SHORTCUTS.UNTAP, untapCards, {
    disabled: !isSelf,
  });

  return (
    <BattlefieldSelectionContextProvider player={player}>
      <ContextMenu items={battlefieldActions}>
        <div
          className={classNames('battlefield', styles.wrapper)}
          ref={wrapperRef}
          onContextMenu={(e) => {
            contextMenuPosition.current = {
              x: e.clientX,
              y: e.clientY,
            };
          }}
        >
          <BattlefieldSelection isFlipped={isFlipped} player={player}>
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
      </ContextMenu>
    </BattlefieldSelectionContextProvider>
  );
};

export default Battlefield;
