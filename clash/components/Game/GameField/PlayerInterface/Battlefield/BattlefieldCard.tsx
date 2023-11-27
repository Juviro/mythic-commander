import React, { CSSProperties, useContext } from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';

import GameStateContext from 'components/Game/GameStateContext';
import styles from './Battlefield.module.css';

interface Props {
  card: VisibleCard;
  isSelf?: boolean;
}

const BattlefieldCard = ({ card, isSelf }: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);

  let { x, y } = card.position!;

  if (!isSelf) {
    x = 100 - x;
    y = 100 - y;
  }

  const style = {
    '--x': `${x}%`,
    '--y': `${y}%`,
    '--player-color': getPlayerColor(card.ownerId),
    '--rotation': isSelf ? '0deg' : '180deg',
  } as CSSProperties;

  return (
    <div className={styles.card} style={style}>
      <Card card={card} draggable zone="battlefield" />
    </div>
  );
};

export default BattlefieldCard;
