import React, { CSSProperties } from 'react';

import { Card as CardType } from 'backend/database/gamestate.types';

import Card from 'components/GameComponents/Card/Card';
import styles from './CardStack.module.css';

interface Props {
  cards: CardType[];
  emptyText: string;
}

const CardStack = ({ cards, emptyText }: Props) => {
  return (
    <div className={styles.wrapper}>
      {cards.map((card, index) => (
        <div
          key={card.clashId}
          className={styles.card}
          style={{ '--rotation': cards.length - index * (index % 2) } as CSSProperties}
        >
          <Card card={card} />
        </div>
      ))}
      {!cards.length && <div className={styles.empty}>{emptyText}</div>}
    </div>
  );
};

export default CardStack;
