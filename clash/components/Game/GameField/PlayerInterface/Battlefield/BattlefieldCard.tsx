import React, { CSSProperties, useContext, useRef } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

import { BattlefieldCard, Player } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import SHORTCUTS from 'constants/shortcuts';
import useShortcut from 'hooks/useShortcut';
import BattlefieldSelectionContext from './BattlefieldSelection/BattlefieldSelectionContext';

import styles from './Battlefield.module.css';

interface Props {
  card: BattlefieldCard;
  player: Player;
}

const BattlefieldCard = ({ card, player }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { getPlayerColor } = useContext(GameStateContext);
  const { onTapCards } = useGameActions();
  const { hoveredCardIds, selectedCardIds, selectionRectangleRef, toggleCardSelection } =
    useContext(BattlefieldSelectionContext);

  const tapCard = () => {
    onTapCards({
      cardIds: [card.clashId],
      playerId: player.id,
    });
  };

  useShortcut(SHORTCUTS.TAP, tapCard, {
    disabled: Boolean(selectedCardIds.length),
    whenHovering: cardRef,
  });

  const { x, y } = card.position!;

  const style = {
    '--x': x,
    '--y': y,
    '--player-color': getPlayerColor(card.ownerId),
  } as CSSProperties;

  const isHovered = hoveredCardIds?.includes(card.clashId);
  const isSelected = selectedCardIds?.includes(card.clashId);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) {
      toggleCardSelection(card.clashId);
    } else {
      tapCard();
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) return;
    e.stopPropagation();
  };

  const component = (
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
        draggable={!isSelected}
        zone="battlefield"
        enlargeOnHover
        noAnimation={isSelected}
      />
    </div>
  );

  if (!isSelected || !selectionRectangleRef.current) return component;

  return <>{createPortal(component, selectionRectangleRef.current)}</>;
};

export default BattlefieldCard;
