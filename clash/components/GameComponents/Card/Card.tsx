import React from 'react';
import { useDrag } from 'react-dnd';

import { Card as CardType } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';

import styles from './Card.module.css';

interface Props {
  card: CardType;
  draggable?: boolean;
}

const Card = ({ card, draggable }: Props) => {
  const [, dragRef] = useDrag({
    type: 'CARD',
    item: { clashId: card.clashId },
    canDrag: draggable,
    previewOptions: {
      offsetX: -200,
      offsetY: -200,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const hidden = !('id' in card);

  return (
    <div className={styles.wrapper} ref={dragRef}>
      {!hidden && <img className={styles.image} src={getImageUrl(card.id)} />}
    </div>
  );
};

export default Card;
