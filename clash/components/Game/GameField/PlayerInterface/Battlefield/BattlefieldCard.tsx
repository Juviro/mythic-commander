import React, { CSSProperties, useContext } from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';

import GameStateContext from 'components/Game/GameStateContext';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import styles from './Battlefield.module.css';
import BattlefieldSelectionContext from './BattlefieldSelection/BattlefieldSelectionContext';

interface Props {
  card: VisibleCard;
}

const BattlefieldCard = ({ card }: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);
  const { hoveredCardIds, selectedCardIds, selectionRectangleRef, toggleCardSelection } =
    useContext(BattlefieldSelectionContext);

  const { x, y } = card.position!;

  const style = {
    '--x': x,
    '--y': y,
    '--player-color': getPlayerColor(card.ownerId),
  } as CSSProperties;

  const isHovered = hoveredCardIds?.includes(card.clashId);
  const isSelected = selectedCardIds?.includes(card.clashId);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) return;
    toggleCardSelection(card.clashId);
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
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      className={classNames(styles.card, 'battlefield_card', {
        [styles.card__hovered]: isHovered,
        [styles.card__selected]: isSelected,
      })}
      data-card-id={card.clashId}
      data-card-x={x}
      data-card-y={y}
    >
      <Card card={card} draggable={!isSelected} zone="battlefield" enlargeOnHover />
    </div>
  );

  if (!isSelected || !selectionRectangleRef.current) return component;

  return <>{createPortal(component, selectionRectangleRef.current)}</>;
};

export default BattlefieldCard;
