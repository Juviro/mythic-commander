import React, { CSSProperties, useContext } from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';

import GameStateContext from 'components/Game/GameStateContext';
import classNames from 'classnames';
import styles from './Battlefield.module.css';
import BattlefieldSelectionContext from './BattlefieldSelection/BattlefieldSelectionContext';

interface Props {
  card: VisibleCard;
}

const BattlefieldCard = ({ card }: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);
  const { hoveredCardIds, selectedCardIds } = useContext(BattlefieldSelectionContext);

  const { x, y } = card.position!;

  const style = {
    '--x': x,
    '--y': y,
    '--player-color': getPlayerColor(card.ownerId),
  } as CSSProperties;

  const isSelected =
    hoveredCardIds.includes(card.clashId) || selectedCardIds.includes(card.clashId);

  return (
    <div
      style={style}
      className={classNames(styles.card, 'battlefield_card', {
        [styles.card__selected]: isSelected,
      })}
      data-card-id={card.clashId}
      data-card-x={x}
      data-card-y={y}
    >
      <Card card={card} draggable zone="battlefield" enlargeOnHover />
    </div>
  );
};

export default BattlefieldCard;
