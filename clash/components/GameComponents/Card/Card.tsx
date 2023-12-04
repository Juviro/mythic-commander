import React, { useRef } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

import { Card as CardType, Zone } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';
import { DropCard } from 'components/Game/Dropzone/Dropzone';
import useAnimateCardPositionChange from './useAnimateCardPositionChange';

import styles from './Card.module.css';

interface Props {
  card: CardType;
  draggable?: boolean;
  dynamicSize?: boolean;
  zone?: Zone;
  enlargeOnHover?: boolean;
  noAnimation?: boolean;
  tooltipPlacement?: TooltipPlacement;
  dropType?: 'CARD' | 'LIST_CARD';
  onDropEnd?: (item: DropCard, monitor: DragSourceMonitor<DropCard>) => void;
}

const Card = ({
  card,
  draggable,
  dynamicSize,
  zone,
  enlargeOnHover,
  noAnimation,
  tooltipPlacement,
  onDropEnd,
  dropType = 'CARD',
}: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: dropType,
    item: { clashId: card.clashId, ownerId: card.ownerId },
    canDrag: Boolean(draggable),
    previewOptions: {
      offsetX: -200,
      offsetY: -200,
    },
    end: onDropEnd,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useAnimateCardPositionChange({ card, cardRef, zone, noAnimation });

  const hidden = !('id' in card);

  const cardComponent = (
    <div
      className={classNames(styles.wrapper, 'card', {
        [styles.wrapper__dynamic_size]: dynamicSize,
        [styles.wrapper__draggable]: draggable,
        [styles.wrapper__dragging]: isDragging,
        card__dragging: isDragging,
      })}
      ref={(val) => {
        dragRef(val);
        cardRef.current = val!;
      }}
    >
      {!hidden && <img className={styles.image} src={getImageUrl(card.id)} />}
    </div>
  );

  if (!enlargeOnHover || hidden) return cardComponent;

  return (
    <Tooltip
      title={!hidden && <img className={styles.image} src={getImageUrl(card.id)} />}
      overlayClassName={styles.tooltip_wrapper}
      mouseEnterDelay={0.3}
      popupVisible={false}
      open={isDragging ? false : undefined}
      placement={tooltipPlacement}
    >
      {cardComponent}
    </Tooltip>
  );
};

export default Card;
