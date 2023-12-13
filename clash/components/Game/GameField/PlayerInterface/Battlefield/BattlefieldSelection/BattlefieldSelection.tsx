import React, {
  MouseEvent,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';
import { XYCoord } from 'react-dnd';

import DragRectange from './DragRectange';
import BattlefieldSelectionContext from './BattlefieldSelectionContext';
import SelectionRectangle from './SelectionRectangle';

import styles from './BattlefieldSelection.module.css';

type Props = PropsWithChildren;

const BattlefieldSelection = ({ children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [startingPoint, setStartingPoint] = useState<XYCoord | null>(null);
  const [currentPoint, setCurrentPoint] = useState<XYCoord | null>(null);

  const { hoveredCardIds, selectedCardIds, setSelectedCardsIds } = useContext(
    BattlefieldSelectionContext
  );

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setStartingPoint({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!startingPoint) return;
    setCurrentPoint({ x: e.clientX, y: e.clientY });

    if (!selectedCardIds.length) return;
    setSelectedCardsIds([]);
  };

  const onMouseLeave = () => {
    setStartingPoint(null);
    setCurrentPoint(null);
  };

  const onMouseUp = () => {
    if (!startingPoint) return;
    setStartingPoint(null);
    setCurrentPoint(null);
    if (!hoveredCardIds.length) return;
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
        <DragRectange
          startingPoint={startingPoint}
          currentPoint={currentPoint}
          wrapperRef={wrapperRef}
        />
      )}
      <SelectionRectangle selectedCardIds={selectedCardIds} wrapperRef={wrapperRef} />
      {children}
    </div>
  );
};

export default BattlefieldSelection;
