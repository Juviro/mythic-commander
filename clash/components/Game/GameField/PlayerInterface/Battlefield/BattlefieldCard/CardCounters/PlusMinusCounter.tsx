import React from 'react';

import { Tooltip } from 'antd';
import styles from './CardCounters.module.css';

interface Props {
  type: 'p1/p1' | 'm1/m1';
  amount: number;
}

const PlusMinusCounter = ({ amount, type }: Props) => {
  const prefix = type === 'p1/p1' ? '+' : '-';
  const label = `${prefix}${amount} / ${prefix}${amount}`;

  return (
    <Tooltip title={label}>
      <div className={styles.counter}>
        <span className={styles.counter_label}>{label}</span>
      </div>
    </Tooltip>
  );
};

export default PlusMinusCounter;
