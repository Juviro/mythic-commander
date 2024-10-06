import React, { CSSProperties, useContext, useRef } from 'react';
import classNames from 'classnames';

import {
  BattlefieldCard as BattlefieldCardType,
  Player,
} from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';
import GameStateContext from 'components/Game/GameStateContext';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import { getCardRotation } from 'utils/cardTypes';
import BattlefieldSelectionContext from '../BattlefieldSelection/BattlefieldSelectionContext';

import styles from './BattlefieldCard.module.css';
import useBattlefieldCardActions from './useBattlefieldCardActions';
import useBattlefieldShortcuts from './useBattlefieldShortcuts';

interface Props {
  card: BattlefieldCardType;
  player: Player;
  inSelection?: boolean;
  inPreview?: boolean;
}

const BattlefieldCard = ({ card, player, inSelection, inPreview }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { getPlayerColor } = useContext(GameStateContext);

  const { hoveredCardIds, selectedCardIds } = useContext(BattlefieldSelectionContext);

  const isHovered = hoveredCardIds?.includes(card.clashId);
  const isSelected = selectedCardIds?.includes(card.clashId);

  const { contextMenuItems, onClick, onMouseDown, onMouseMove } =
    useBattlefieldCardActions({ card, player, isSelected });

  useBattlefieldShortcuts({ card, player, selectedCardIds, cardRef });

  const { x, y } = card.position!;

  if (isSelected && !inSelection) {
    return null;
  }

  let rotation = getCardRotation(card);
  if (card.tapped) {
    rotation += 90;
  }

  const style = {
    '--x': x,
    '--y': y,
    '--player-color': getPlayerColor(card.ownerId),
    '--rotation': `${rotation}deg`,
  } as CSSProperties;

  return (
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
          [styles.card__rotation]: rotation,
          [styles.card__flipped]: 'rotateDeg' in card && card.rotateDeg === 180,
        })}
        onContextMenu={inSelection ? undefined : (e) => e.stopPropagation()}
        data-card-id={inPreview ? `${card.clashId}-preview` : card.clashId}
        data-tapped={inPreview ? false : card.tapped}
        data-card-x={x}
        data-card-y={y}
      >
        <Card
          card={card}
          transformed={'transformed' in card && card.transformed}
          draggable={!isSelected}
          zone="battlefield"
          noAnimation={isSelected || inPreview}
        />
      </div>
    </ContextMenu>
  );
};

export default BattlefieldCard;
