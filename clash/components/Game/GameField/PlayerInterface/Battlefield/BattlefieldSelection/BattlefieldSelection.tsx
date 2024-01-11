import React, {
  MouseEvent,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { XYCoord } from 'react-dnd';

import { Player } from 'backend/database/gamestate.types';
import useClickedOutside from 'hooks/useClickedOutside';
import DragRectange from './DragRectange';
import BattlefieldSelectionContext from './BattlefieldSelectionContext';
import SelectionRectangle from './SelectionRectangle';

import styles from './BattlefieldSelection.module.css';

interface Props extends PropsWithChildren {
  isFlipped: boolean;
  player: Player;
}

const BattlefieldSelection = ({ children, isFlipped, player }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [startingPoint, setStartingPoint] = useState<XYCoord | null>(null);
  const [currentPoint, setCurrentPoint] = useState<XYCoord | null>(null);

  const { hoveredCardIds, selectedCardIds, setSelectedCardsIds } = useContext(
    BattlefieldSelectionContext
  );

  useClickedOutside(wrapperRef, () => {
    setStartingPoint(null);
    setCurrentPoint(null);
    setSelectedCardsIds([]);
  });

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setStartingPoint({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = (e: MouseEventInit) => {
    if (!startingPoint) return;
    setCurrentPoint({ x: e.clientX ?? 0, y: e.clientY ?? 0 });

    if (!selectedCardIds.length) return;
    setSelectedCardsIds([]);
  };

  const onMouseUp = () => {
    if (!startingPoint) return;
    setStartingPoint(null);
    setCurrentPoint(null);
    if (!hoveredCardIds.length) return;
    setSelectedCardsIds(hoveredCardIds);
  };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [startingPoint, currentPoint]);

  return (
    <div
      className={styles.selection}
      onMouseDown={onMouseDown}
      onDrag={onMouseUp}
      ref={wrapperRef}
    >
      {startingPoint && currentPoint && (
        <DragRectange
          startingPoint={startingPoint}
          currentPoint={currentPoint}
          wrapperRef={wrapperRef}
        />
      )}
      <SelectionRectangle
        selectedCardIds={selectedCardIds}
        wrapperRef={wrapperRef}
        isFlipped={isFlipped}
        player={player}
      />
      {children}
    </div>
  );
};

export default BattlefieldSelection;
