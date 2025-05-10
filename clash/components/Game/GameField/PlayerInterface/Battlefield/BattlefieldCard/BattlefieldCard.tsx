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
import useGameActions from 'components/Game/useGameActions';
import BattlefieldSelectionContext from '../BattlefieldSelection/BattlefieldSelectionContext';

import styles from './BattlefieldCard.module.css';
import useBattlefieldCardActions from './useBattlefieldCardActions';
import useBattlefieldShortcuts from './useBattlefieldShortcuts';
import useHoveredCards from './useHoveredCards';

interface Props {
  card: BattlefieldCardType;
  player: Player;
  inSelection?: boolean;
  inPreview?: boolean;
}

const BattlefieldCard = ({ card, player, inSelection, inPreview }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { getPlayerColor } = useContext(GameStateContext);
  const { hoveringCard, hoveringPlayer } = useHoveredCards(card);

  const { onHoverCard } = useGameActions();

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
    '--hovering-player-color': hoveringPlayer && getPlayerColor(hoveringPlayer, 0.6),
  } as CSSProperties;

  return (
    <ContextMenu items={isSelected ? null : contextMenuItems} placement="bottomLeft">
      <div
        style={style}
        ref={cardRef}
        // Make sure that hovering the same cards twice re-plays the animation
        key={hoveringCard?.timestamp}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseEnter={() => onHoverCard(card.clashId, player.id)}
        className={classNames(styles.card, 'battlefield_card', {
          [styles.card__hovered]: isHovered,
          [styles.card__hovered_by_enemy]: hoveringPlayer,
          [styles.card__selected]: isSelected,
          [styles.card__rotation]: rotation,
          [styles.card__flipped]: 'flipped' in card && card.flipped,
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
