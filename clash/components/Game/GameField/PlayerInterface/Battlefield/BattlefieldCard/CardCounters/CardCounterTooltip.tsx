import React, { MouseEvent, ReactNode } from 'react';
import { Tooltip } from 'antd';

import { getCountersLabel } from 'constants/counters';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import useGameActions from 'components/Game/useGameActions';

import LongPress from 'components/lib/LongPress/LongPress';
import styles from './CardCounters.module.css';

interface Props {
  children: ReactNode;
  type: string;
  amount: number;
  clashId: string;
  hidden?: boolean;
}

const CardCounterTooltip = ({ children, type, amount, clashId, hidden }: Props) => {
  const { onAddCounters } = useGameActions();

  if (hidden) {
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>{children}</>
    );
  }

  const onClickPlusMins =
    (isMinus: boolean, newAmount = 1) =>
    (e?: MouseEvent) => {
      e?.stopPropagation();

      let fixedAmount = newAmount;
      if (isMinus && amount < newAmount) {
        fixedAmount = amount;
      }

      onAddCounters({
        cardIds: [clashId],
        type,
        amount: isMinus ? -fixedAmount : fixedAmount,
      });
    };

  const onDelete = (e: MouseEvent) => {
    e.stopPropagation();
    onAddCounters({
      cardIds: [clashId],
      type,
      amount: -amount,
    });
  };

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const getLabelWithP1P1 = () => {
    if (type !== 'p1/p1' && type !== 'm1/m1') return getCountersLabel(type);

    const prefix = type === 'm1/m1' ? '-' : '+';
    const label = `${prefix}${amount} / ${prefix}${amount}`;
    return label;
  };

  const tooltipContent = (
    <div className={styles.tooltip} onClick={stopPropagation}>
      <div className={styles.tooltip_title}>
        {getLabelWithP1P1()}
        <DeleteOutlined onClick={onDelete} />
      </div>
      <div className={styles.tooltip__input_wrapper}>
        <LongPress
          onLongPress={onClickPlusMins(true, 10)}
          onPress={onClickPlusMins(true)}
        >
          <MinusOutlined className={styles.tooltip_button_minus} />
        </LongPress>
        <span className={styles.tooltip__amount}>{amount}</span>
        <LongPress
          onLongPress={onClickPlusMins(false, 10)}
          onPress={onClickPlusMins(false)}
        >
          <PlusOutlined className={styles.tooltip_button_plus} />
        </LongPress>
      </div>
    </div>
  );

  return (
    <Tooltip
      title={tooltipContent}
      arrow={false}
      overlayInnerStyle={{
        background: 'white',
        color: 'inherit',
      }}
    >
      {children}
    </Tooltip>
  );
};

export default CardCounterTooltip;
