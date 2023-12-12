import React, { PropsWithChildren, useContext, useRef, useState } from 'react';
import { XYCoord } from 'react-dnd';

import SelectionRectangle from './SelectionRectangle';
import BattlefieldSelectionContext from './BattlefieldSelectionContext';

import styles from './BattlefieldSelection.module.css';

type Props = PropsWithChildren;

const BattlefieldSelection = ({ children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [startingPoint, setStartingPoint] = useState<XYCoord | null>(null);
  const [currentPoint, setCurrentPoint] = useState<XYCoord | null>(null);

  const { hoveredCardIds, setSelectedCardsIds } = useContext(BattlefieldSelectionContext);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartingPoint({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!startingPoint) return;
    setCurrentPoint({ x: e.clientX, y: e.clientY });
  };

  const onMouseLeave = () => {
    setStartingPoint(null);
    setCurrentPoint(null);
  };

  const onMouseUp = () => {
    setStartingPoint(null);
    setCurrentPoint(null);
    setSelectedCardsIds(hoveredCardIds);
  };

  return (
    <div
      className={styles.selection}
      onMouseDown={onMouseDown}
      onDrag={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      ref={wrapperRef}
    >
      {startingPoint && currentPoint && (
        <SelectionRectangle
          startingPoint={startingPoint}
          currentPoint={currentPoint}
          wrapperRef={wrapperRef}
        />
      )}
      {children}
    </div>
  );
};

export default BattlefieldSelection;
