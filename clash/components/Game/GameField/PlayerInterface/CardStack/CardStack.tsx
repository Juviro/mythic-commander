import React, { CSSProperties, ReactNode } from 'react';

import { Card as CardType, Zone } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';

import styles from './CardStack.module.css';

interface Props {
  cards: CardType[];
  emptyText?: string;
  emptyImage?: ReactNode;
  draggable?: boolean;
  zone: Zone;
  canHover?: boolean;
}

const CardStack = ({
  cards,
  emptyText,
  emptyImage,
  draggable,
  zone,
  canHover,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      {cards.map((card, index) => (
        <div
          key={card.clashId}
          className={styles.card}
          style={{ '--rotation': cards.length - index * (index % 2) } as CSSProperties}
        >
          <Card
            card={card}
            draggable={draggable}
            zone={zone}
            enlargeOnHover={canHover && index + 1 === cards.length}
            tooltipPlacement="topRight"
          />
        </div>
      ))}
      {!cards.length && <div className={styles.empty}>{emptyImage || emptyText}</div>}
    </div>
  );
};

export default CardStack;
