import React, { RefObject, useContext, useLayoutEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';

import { DndItemTypes } from 'types/dnd.types';
import useWindowSize from 'hooks/useWindowSize';
import styles from './BattlefieldSelection.module.css';
import BattlefieldSelectionContext from './BattlefieldSelectionContext';

const PADDING = 15;
const BORDER_WIDTH = 2;

const getRectangle = (cardIds: string[]) => {
  const cards = cardIds
    .map((id) => document.querySelector(`[data-card-id="${id}"]`))
    .filter(Boolean) as Element[];

  if (cards.length === 0) return {};

  const bounds = cards.reduce(
    (acc, card) => {
      const { x, y } = card.getBoundingClientRect();
      return {
        top: Math.min(acc.top, y),
        left: Math.min(acc.left, x),
        width: Math.max(acc.width, x + card.clientWidth),
        height: Math.max(acc.height, y + card.clientHeight),
      };
    },
    {
      top: Infinity,
      left: Infinity,
      width: 0,
      height: 0,
    }
  );

  const top = bounds.top - PADDING + BORDER_WIDTH;
  const left = bounds.left - PADDING + BORDER_WIDTH;

  return {
    marginTop: top,
    marginLeft: left,
    width: bounds.width - bounds.left + PADDING * 2,
    height: bounds.height - bounds.top + PADDING * 2,
  };
};

interface Props {
  selectedCardIds: string[];
  wrapperRef: RefObject<HTMLDivElement>;
}

const SelectionRectangle = ({ selectedCardIds, wrapperRef }: Props) => {
  const { selectionRectangleRef } = useContext(BattlefieldSelectionContext);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);

  useWindowSize();

  useLayoutEffect(() => {
    if (!selectionRectangleRef.current) return;
    const rect = getRectangle(selectedCardIds);
    const { style } = selectionRectangleRef.current;

    if (!rect.width || !rect.height) return;

    const wrapperTop = wrapperRef.current?.getBoundingClientRect().top ?? 0;
    const wrapperLeft = wrapperRef.current?.getBoundingClientRect().left ?? 0;

    const top = rect.marginTop - wrapperTop;
    const left = rect.marginLeft - wrapperLeft;

    style.marginTop = `${top}px`;
    style.marginLeft = `${left}px`;
    style.width = `${rect.width}px`;
    style.height = `${rect.height}px`;

    if (offset?.x === left && offset?.y === top) return;

    setOffset({
      x: left,
      y: top,
    });
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: DndItemTypes.CARD_GROUP,
    item: {
      cardIds: selectedCardIds,
      offset,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      className={styles.selection_rectangle_wrapper}
    >
      <div
        ref={(val) => {
          dragRef(val);
          // @ts-ignore
          selectionRectangleRef.current = val;
        }}
        className={classNames(styles.selection_rectangle, {
          [styles.selection_rectangle__visible]: selectedCardIds.length,
          [styles.selection_rectangle__dragging]: isDragging,
        })}
      />
    </div>
  );
};

export default SelectionRectangle;
