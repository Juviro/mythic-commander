import React from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import LongPress from 'components/GameComponents/LongPress/LongPress';

import classNames from 'classnames';
import styles from './LifeTotals.module.css';

interface Props {
  amount: number;
  onChangeLife: (delta: number) => () => void;
  alwaysShowButtons?: boolean;
}

const LifeButtons = ({ onChangeLife, amount, alwaysShowButtons }: Props) => {
  return (
    <>
      <div className={styles.life}>
        <span>{amount}</span>
      </div>
      <div
        className={classNames(styles.buttons, {
          [styles.buttons__always_visible]: alwaysShowButtons,
        })}
      >
        <LongPress onLongPress={onChangeLife(-10)} onPress={onChangeLife(-1)}>
          <MinusOutlined />
        </LongPress>
        <LongPress onLongPress={onChangeLife(10)} onPress={onChangeLife(1)}>
          <PlusOutlined />
        </LongPress>
      </div>
    </>
  );
};

export default LifeButtons;
