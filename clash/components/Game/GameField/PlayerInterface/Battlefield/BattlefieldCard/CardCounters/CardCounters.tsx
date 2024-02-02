import React from 'react';

import { BattlefieldCard, Card } from 'backend/database/gamestate.types';

import { getIconType } from 'constants/counters';
import styles from './CardCounters.module.css';
import CardCounter from './CardCounter';

interface Props {
  card: Card;
}

const isBattlefieldCard = (card: Card): card is BattlefieldCard => {
  return 'counters' in card;
};

const CardCounters = ({ card }: Props) => {
  if (!isBattlefieldCard(card)) return null;
  if (!card.counters) return null;

  const counters = Object.entries(card.counters)
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

  return (
    <div className={styles.wrapper}>
      {counters.map(({ type, amount }) => (
        <CardCounter
          key={type}
          type={type.toLowerCase()}
          amount={amount}
          clashId={card.clashId}
        />
      ))}
    </div>
  );
};

export default CardCounters;
