import React, { CSSProperties } from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';

import styles from './Battlefield.module.css';

interface Props {
  card: VisibleCard;
}

const BattlefieldCard = ({ card }: Props) => {
  return (
    <div
      className={styles.card}
      style={
        {
          '--x': `${card.position!.x}%`,
          '--y': `${card.position!.y}%`,
        } as CSSProperties
      }
    >
      <Card card={card} draggable />
    </div>
  );
};

export default BattlefieldCard;
