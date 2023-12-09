import React, { CSSProperties } from 'react';

import styles from './DragLayer.module.css';

interface Props {
  element: Element | null;
  offset: number;
  property: 'x' | 'y';
}

const AlignIndicator = ({ element, offset, property }: Props) => {
  if (!element) return null;

  const style: CSSProperties = {};

  if (property === 'x') {
    const { width, height, y, x } = element.getBoundingClientRect();
    const top = offset < y ? offset : y;

    style.height = Math.abs(offset - y);
    style.width = '1px';
    style.top = top + height / 2;
    style.left = x + width / 2;
  } else {
    const { width, height, y, x } = element.getBoundingClientRect();
    const left = offset < x ? offset : x;

    style.width = Math.abs(offset - x);
    style.height = '1px';
    style.top = y + height / 2;
    style.left = left + width / 2;
  }

  return <div className={styles.align_indicator} style={style} />;
};

export default AlignIndicator;
