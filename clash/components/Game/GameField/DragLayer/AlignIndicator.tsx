import React, { CSSProperties, useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';

import styles from './DragLayer.module.css';

interface Props {
  element: Element | null;
  offset: number;
  property: 'x' | 'y';
}

const AlignIndicator = ({ element, offset, property }: Props) => {
  const { battlefieldCardWidth, battlefieldCardHeight } = useContext(GameStateContext);
  if (!element) return null;

  const style: CSSProperties = {};

  if (property === 'x') {
    const { width, height, y, x } = element.getBoundingClientRect();
    const top = offset < y ? offset : y;

    style.height = Math.abs(offset - y) - battlefieldCardHeight / 2;
    style.top = top + height / 2;
    style.left = x + width / 2;
  } else {
    const { width, height, y, x } = element.getBoundingClientRect();
    const left = offset < x ? offset : x;

    style.width = Math.abs(offset - x) - battlefieldCardWidth / 2;
    style.top = y + height / 2;
    style.left = left + width / 2;
  }

  return <div className={styles.align_indicator} style={style} />;
};

export default AlignIndicator;
