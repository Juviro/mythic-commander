import React, { PropsWithChildren, useState } from 'react';
import { XYCoord } from 'react-dnd';

import styles from './Battlefield.module.css';
import SelectionRectangle from './SelectionRectangle';

type Props = PropsWithChildren;

const BattlefieldSelection = ({ children }: Props) => {
  const [startingPoint, setStartingPoint] = useState<XYCoord | null>(null);
  const [currentPoint, setCurrentPoint] = useState<XYCoord | null>(null);
  console.log('startingPoint, currentPoint', startingPoint, currentPoint);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartingPoint({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!startingPoint) return;
    setCurrentPoint({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = () => {
    setStartingPoint(null);
    setCurrentPoint(null);
  };

  return (
    <div
      className={styles.selection}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <SelectionRectangle startingPoint={startingPoint} currentPoint={currentPoint} />
      {children}
    </div>
  );
};

export default BattlefieldSelection;
