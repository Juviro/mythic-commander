import React, { CSSProperties, useContext, useRef } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

import { BattlefieldCard, Player } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';
import GameStateContext from 'components/Game/GameStateContext';
import SHORTCUTS from 'constants/shortcuts';
import useShortcut from 'hooks/useShortcut';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import BattlefieldSelectionContext from '../BattlefieldSelection/BattlefieldSelectionContext';

import styles from './BattlefieldCard.module.css';
import useBattlefieldCardActions from './useBattlefieldCardActions';

interface Props {
  card: BattlefieldCard;
  player: Player;
}

const BattlefieldCard = ({ card, player }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { getPlayerColor } = useContext(GameStateContext);

  const { hoveredCardIds, selectedCardIds, selectionRectangleRef } = useContext(
    BattlefieldSelectionContext
  );

  const isHovered = hoveredCardIds?.includes(card.clashId);
  const isSelected = selectedCardIds?.includes(card.clashId);

  const { tapCards, flipCards, contextMenuItems, onClick, onMouseDown, onMouseMove } =
    useBattlefieldCardActions({ card, player, isSelected });

  useShortcut(SHORTCUTS.TAP, tapCards, {
    disabled: Boolean(selectedCardIds.length),
    whenHovering: cardRef,
  });

  useShortcut(SHORTCUTS.FLIP, flipCards, {
    disabled: Boolean(selectedCardIds.length),
    whenHovering: cardRef,
  });

  const { x, y } = card.position!;

  const style = {
    '--x': x,
    '--y': y,
    '--player-color': getPlayerColor(card.ownerId),
  } as CSSProperties;

  const component = (
    <ContextMenu items={isSelected ? null : contextMenuItems} placement="bottomLeft">
      <div
        style={style}
        ref={cardRef}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        className={classNames(styles.card, 'battlefield_card', {
          [styles.card__hovered]: isHovered,
          [styles.card__selected]: isSelected,
          [styles.card__tapped]: card.tapped,
        })}
        data-card-id={card.clashId}
        data-tapped={card.tapped}
        data-card-x={x}
        data-card-y={y}
      >
        <Card
          card={card}
          flipped={card.flipped}
          draggable={!isSelected}
          zone="battlefield"
          enlargeOnHover
          noAnimation={isSelected}
        />
      </div>
    </ContextMenu>
  );

  if (!isSelected || !selectionRectangleRef.current) return component;

  return <>{createPortal(component, selectionRectangleRef.current)}</>;
};

export default BattlefieldCard;
