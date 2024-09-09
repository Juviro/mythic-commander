import React from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import LongPress from 'components/lib/LongPress/LongPress';

import styles from './PlusMinus.module.css';

interface Props {
  amount: number;
  onChange: (delta: number) => () => void;
  alwaysShowButtons?: boolean;
  canEdit?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const PlusMinus = ({ onChange, amount, alwaysShowButtons, size, canEdit }: Props) => {
  return (
    <>
      <div className={styles.plus_minus}>
        <span>{amount}</span>
      </div>
      {canEdit && (
        <div
          className={classNames('plus_minus_buttons', styles.buttons, {
            [styles.buttons__always_visible]: alwaysShowButtons,
            [styles.buttons__small]: size === 'small',
            [styles.buttons__large]: size === 'large',
          })}
        >
          <LongPress onLongPress={onChange(-10)} onPress={onChange(-1)}>
            <MinusOutlined />
          </LongPress>
          <LongPress onLongPress={onChange(10)} onPress={onChange(1)}>
            <PlusOutlined />
          </LongPress>
        </div>
      )}
    </>
  );
};

export default PlusMinus;
