import React from 'react';

import styles from './ColorPicker.module.css';

interface Props {
  color: string | null;
}

const ColorField = ({ color }: Props) => {
  return <div className={styles.color} style={{ backgroundColor: color ?? '' }} />;
};

export default ColorField;
