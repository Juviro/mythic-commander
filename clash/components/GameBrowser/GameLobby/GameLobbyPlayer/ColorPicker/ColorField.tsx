import React from 'react';

import classNames from 'classnames';
import styles from './ColorPicker.module.css';

interface Props {
  color: string | null;
}

const ColorField = ({ color }: Props) => {
  return (
    <div
      className={classNames(styles.color, 'colorfield')}
      style={{ backgroundColor: color ?? '' }}
    />
  );
};

export default ColorField;
