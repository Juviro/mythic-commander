import React, { CSSProperties, useContext } from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';

import GameStateContext from 'components/Game/GameStateContext';
import styles from './Battlefield.module.css';

interface Props {
  card: VisibleCard;
}

const BattlefieldCard = ({ card }: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);

  const style = {
    '--x': `${card.position!.x}%`,
    '--y': `${card.position!.y}%`,
    '--player-color': getPlayerColor(card.ownerId),
  } as CSSProperties;

  return (
    <div className={styles.card} style={style}>
      <Card card={card} draggable />
    </div>
  );
};

export default BattlefieldCard;
