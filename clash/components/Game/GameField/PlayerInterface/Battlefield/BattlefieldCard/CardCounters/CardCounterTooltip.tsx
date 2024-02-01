import React, { MouseEvent, ReactNode } from 'react';

import { Tooltip } from 'antd';
import { getCountersLabel } from 'constants/counters';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import useGameActions from 'components/Game/useGameActions';
import styles from './CardCounters.module.css';

interface Props {
  children: ReactNode;
  type: string;
  amount: number;
  clashId: string;
}

const CardCounterTooltip = ({ children, type, amount, clashId }: Props) => {
  const { onAddCounters } = useGameActions();

  const onClickPlusMins = (isMinus: boolean) => (e: MouseEvent) => {
    e.stopPropagation();
    onAddCounters({
      cardIds: [clashId],
      type,
      amount: isMinus ? -1 : 1,
    });
  };

  const tooltipContent = (
    <div className={styles.tooltip}>
      {getCountersLabel(type)}
      <div className={styles.tooltip__input_wrapper}>
        <MinusOutlined
          onClick={onClickPlusMins(true)}
          className={styles.tooltip_button_minus}
        />
        <span className={styles.tooltip__amount}>{amount}</span>
        <PlusOutlined
          onClick={onClickPlusMins(false)}
          className={styles.tooltip_button_plus}
        />
      </div>
    </div>
  );

  return (
    <Tooltip
      title={tooltipContent}
      overlayInnerStyle={{ background: 'white', color: 'inherit' }}
    >
      {children}
    </Tooltip>
  );
};

export default CardCounterTooltip;
