import React from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';

import { DropCard } from 'components/Game/Dropzone/Dropzone';

import styles from './StackedCardList.module.css';

interface Props {
  onDrop?: (card: DropCard) => void;
  index: number;
  numberOfElements: number;
}

const CardListHoverElement = ({ onDrop, index, numberOfElements }: Props) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'LIST_CARD',
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
