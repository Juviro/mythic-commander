import React from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';

import { DndItemType, DropCard } from 'types/dnd.types';
import styles from './StackedCardList.module.css';

interface Props {
  onDrop?: (card: DropCard) => void;
  index: number;
  numberOfElements: number;
  accept: DndItemType;
}

const CardListHoverElement = ({ onDrop, index, numberOfElements, accept }: Props) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const style = {
    width: `${100 / numberOfElements}%`,
    left: `${100 * (index / numberOfElements)}%`,
  };

  return (
    <div
      ref={dropRef}
      style={style}
      className={classNames(styles.hover_element, {
        [styles.hover_element__is_over]: isOver,
        [styles.hover_element__can_drop]: canDrop,
      })}
    />
  );
};

export default CardListHoverElement;
