import React from 'react';

import { BattlefieldCard } from 'backend/database/gamestate.types';
import { DEFAULT_COUNTERS } from 'constants/counters';
import PlusMinusCounter from './PlusMinusCounter';

import styles from './CardCounters.module.css';

interface Props {
  card: BattlefieldCard;
}

const getCountersLabel = (type: string) => {
  return DEFAULT_COUNTERS.find((counter) => counter.type === type)?.label || type;
};

const CardCounters = ({ card }: Props) => {
  if (!card.counters) return null;

  const counters = Object.entries(card.counters)
    .map(([type, amount]) => ({
      type,
      amount,
    }))
    .sort((a, b) => {
      if (a.type === 'p1/p1' || a.type === 'm1/m1') return -1;
      if (b.type === 'p1/p1' || b.type === 'm1/m1') return 1;
      return 0;
    });

  return (
    <div className={styles.wrapper}>
      {counters.map(({ type, amount }) => {
        if (type === 'p1/p1' || type === 'm1/m1') {
          return <PlusMinusCounter key={type} type={type} amount={amount} />;
        }

        return (
          <div key={type} className={styles.counter}>
            {amount > 1 && <span>{amount}</span>}
            <span className={styles.counter_label}>{getCountersLabel(type)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CardCounters;
