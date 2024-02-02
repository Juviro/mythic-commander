import React from 'react';

import { BattlefieldCard, Card } from 'backend/database/gamestate.types';

import { getIconType } from 'constants/counters';
import styles from './CardCounters.module.css';
import CardCounter from './CardCounter';

interface Props {
  card: Card;
}

interface CardCounter {
  type: string;
  amount: number;
  isLabel?: boolean;
}

const isBattlefieldCard = (card: Card): card is BattlefieldCard => {
  return Boolean('counters' in card || ('meta' in card && card.meta?.isCardCopy));
};

const CardCounters = ({ card }: Props) => {
  if (!isBattlefieldCard(card)) return null;
  if (!card.counters && !card.meta?.isCardCopy) return null;

  const counters: CardCounter[] = Object.entries(card.counters ?? [])
    .map(([type, amount]) => ({
      type,
      amount,
    }))
    .sort((a, b) => {
      if (a.type === 'p1/p1' || a.type === 'm1/m1') return -1;
      if (b.type === 'p1/p1' || b.type === 'm1/m1') return 1;

      const hasIconA = getIconType(a.type);
      const hasIconB = getIconType(b.type);

      if (hasIconA && !hasIconB) return -1;
      if (!hasIconA && hasIconB) return 1;
      return a.type.localeCompare(b.type);
    });

  const cardLabels: CardCounter[] = [];

  if (card.meta?.isCardCopy) {
    // add invisible space to prevent users to cause a key collision
    cardLabels.push({ type: 'Token Copy‎', isLabel: true, amount: 1 });
  }

  const countersAndLabels = cardLabels.concat(counters);

  return (
    <div className={styles.wrapper}>
      {countersAndLabels.map(({ type, amount, isLabel }) => (
        <CardCounter
          key={type}
          type={type}
          amount={amount}
          isLabel={isLabel}
          clashId={card.clashId}
        />
      ))}
    </div>
  );
};

export default CardCounters;
