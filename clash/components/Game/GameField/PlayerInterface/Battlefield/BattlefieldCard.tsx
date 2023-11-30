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

  const { x, y } = card.position!;

  const style = {
    '--x': x,
    '--y': y,
    '--player-color': getPlayerColor(card.ownerId),
  } as CSSProperties;

  return (
    <div className={styles.card} style={style}>
      <Card card={card} draggable zone="battlefield" enlargeOnHover />
    </div>
  );
};

export default BattlefieldCard;
