import React from 'react';
import SVG from 'react-inlinesvg';

import { getCountersLabel, getIconType } from 'constants/counters';

import classNames from 'classnames';
import styles from './CardCounters.module.css';
import CardCounterTooltip from './CardCounterTooltip';

interface Props {
  type: string;
  amount: number;
  isLabel?: boolean;
  clashId: string;
  additionalClassName?: string;
}

const CardCounter = ({ amount, type, clashId, isLabel, additionalClassName }: Props) => {
  const lowerCaseType = type.toLowerCase();
  if (
    lowerCaseType === 'generic' ||
    lowerCaseType === 'amount' ||
    lowerCaseType === 'lore' ||
    lowerCaseType === 'defense'
  ) {
    const colors = {
      generic: 'green',
      amount: 'orange',
      lore: 'yellow',
      defense: 'red',
    };
    const colorClassName = `counter_bubble__${colors[lowerCaseType]}`;

    return (
      <CardCounterTooltip type={type} amount={amount} clashId={clashId}>
        <div
          className={classNames(
            styles.counter_bubble,
            additionalClassName,
            styles[colorClassName]
          )}
        >
          <span>{amount}</span>
        </div>
      </CardCounterTooltip>
    );
  }

  if (lowerCaseType === 'p1/p1' || lowerCaseType === 'm1/m1') {
    const isMinus = lowerCaseType === 'm1/m1';

    return (
      <CardCounterTooltip type={type} amount={amount} clashId={clashId}>
        <div
          className={classNames(
            styles.counter_bubble,
            styles.counter_bubble__blue,
            additionalClassName,
            {
              [styles.counter_bubble__minus]: isMinus,
            }
          )}
        >
          {amount}
        </div>
      </CardCounterTooltip>
    );
  }
  if (lowerCaseType === 'loyalty') {
    return (
      <CardCounterTooltip type={type} amount={amount} clashId={clashId}>
        <div className={classNames(styles.counter_loyalty, additionalClassName)}>
          <SVG
            src="/assets/mtgicons/counter-loyalty.svg"
            className={styles.counter_loyalty_icon}
          />
          <span className={styles.counter_loyalty_amount}>{amount}</span>
        </div>
      </CardCounterTooltip>
    );
  }

  const iconType = getIconType(lowerCaseType);

  if (iconType) {
    const namePrefix = iconType === 'counter' ? 'counter' : 'ability';

    return (
      <CardCounterTooltip type={type} amount={amount} clashId={clashId}>
        <div className={classNames(styles.counter_icon_wrapper, additionalClassName)}>
          {amount > 1 && <span>{amount}</span>}
          <SVG
            src={`/assets/mtgicons/${namePrefix}-${type
              .replace(/\s/, '')
              .toLowerCase()}.svg`}
            className={styles.counter_icon}
          />
        </div>
      </CardCounterTooltip>
    );
  }

  return (
    <CardCounterTooltip type={type} amount={amount} clashId={clashId} hidden={isLabel}>
      <div className={styles.counter}>
        {amount > 1 && <span>{`${amount}x`}</span>}
        <span className={styles.counter_label}>{getCountersLabel(type)}</span>
      </div>
    </CardCounterTooltip>
  );
};

export default CardCounter;
