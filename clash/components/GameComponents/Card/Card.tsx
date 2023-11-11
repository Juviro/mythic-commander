import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { Card as CardType } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';

import classNames from 'classnames';
import styles from './Card.module.css';
import useAnimateCardPositionChange from './useAnimateCardPositionChange';

interface Props {
  card: CardType;
  draggable?: boolean;
}

const Card = ({ card, draggable }: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { clashId: card.clashId },
    canDrag: Boolean(draggable),
    previewOptions: {
      offsetX: -200,
      offsetY: -200,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useAnimateCardPositionChange(card, cardRef);

  const hidden = !('id' in card);

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.dragging]: isDragging,
      })}
      ref={(val) => {
        dragRef(val);
        cardRef.current = val!;
      }}
    >
      {!hidden && <img className={styles.image} src={getImageUrl(card.id)} />}
    </div>
  );
};

export default Card;
