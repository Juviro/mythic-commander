import React, { useRef } from 'react';

import { XYCoord } from 'react-dnd';
import classNames from 'classnames';
import styles from './BattlefieldSelection.module.css';
import useSelection from './useSelection';

const MIN_SIZE = 10;

interface Props {
  startingPoint: XYCoord;
  currentPoint: XYCoord;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

const DragRectange = ({ currentPoint, startingPoint, wrapperRef }: Props) => {
  const rectRef = useRef<HTMLDivElement>(null);
  useSelection(wrapperRef, rectRef);

  const width = Math.abs(startingPoint.x - currentPoint.x);
  const height = Math.abs(startingPoint.y - currentPoint.y);
  const left = Math.min(startingPoint.x, currentPoint.x);
  const top = Math.min(startingPoint.y, currentPoint.y);

  const rect = {
    left,
    top,
    width,
    height,
  };

  if (width < MIN_SIZE || height < MIN_SIZE) {
    return null;
  }

  return (
    <div
      className={classNames(styles.drag_rectangle, 'drag_rectangle')}
      style={rect}
      ref={rectRef}
    />
  );
};

export default DragRectange;
