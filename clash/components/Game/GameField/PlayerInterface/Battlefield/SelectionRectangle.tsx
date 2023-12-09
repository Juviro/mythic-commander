import React from 'react';

import { XYCoord } from 'react-dnd';
import styles from './Battlefield.module.css';

interface Props {
  startingPoint: XYCoord | null;
  currentPoint: XYCoord | null;
}

const SelectionRectangle = ({ currentPoint, startingPoint }: Props) => {
  if (!startingPoint || !currentPoint) {
    return null;
  }

  const rect = {
    left: Math.min(startingPoint.x, currentPoint.x),
    top: Math.min(startingPoint.y, currentPoint.y),
    width: Math.abs(startingPoint.x - currentPoint.x),
    height: Math.abs(startingPoint.y - currentPoint.y),
  };

  return <div className={styles.rectangle} style={rect} />;
};

export default SelectionRectangle;
