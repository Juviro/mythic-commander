import React from 'react';
import SVG from 'react-inlinesvg';

import { DEFAULT_COUNTERS, getIconType } from 'constants/counters';

import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './CardCounters.module.css';

const getCountersLabel = (type: string) => {
  return DEFAULT_COUNTERS.find((counter) => counter.type === type)?.label || type;
};

interface Props {
  type: string;
  amount: number;
}

const CardCounter = ({ amount, type }: Props) => {
  if (type === 'generic') {
    return (
      <div className={classNames(styles.counter_bubble, styles.counter_bubble__green)}>
        <span>{amount}</span>
      </div>
    );
  }

  if (type === 'p1/p1' || type === 'm1/m1') {
    const isMinus = type === 'm1/m1';
    const prefix = isMinus ? '-' : '+';
    const label = `${prefix}${amount} / ${prefix}${amount}`;

    return (
      <Tooltip title={label}>
        <div
          className={classNames(styles.counter_bubble, styles.counter_bubble__blue, {
            [styles.counter_bubble__minus]: isMinus,
          })}
        >
          {amount}
        </div>
      </Tooltip>
    );
  }

  const iconType = getIconType(type);

  if (iconType) {
    const namePrefix = iconType === 'counter' ? 'counter' : 'ability';
    const countersLabel = getCountersLabel(type);
    const tooltip = amount > 1 ? `${amount}x ${countersLabel}` : countersLabel;

    return (
      <Tooltip title={tooltip}>
        <div className={styles.counter_icon_wrapper}>
          {amount > 1 && <span>{amount}</span>}
          <SVG
            src={`/assets/mtgicons/${namePrefix}-${type.toLowerCase()}.svg`}
            className={styles.counter_icon}
          />
        </div>
      </Tooltip>
    );
  }

  return (
    <div className={styles.counter}>
      {amount > 1 && <span>{`${amount}x`}</span>}
      <span className={styles.counter_label}>{getCountersLabel(type)}</span>
    </div>
  );
};

export default CardCounter;
