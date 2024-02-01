import React, { useEffect, useRef } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import classNames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { TooltipPlacement } from 'antd/es/tooltip';

import { Card as CardType, Zone } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';
import { DndItemTypes, DropCard } from 'types/dnd.types';
import CardCounters from 'components/Game/GameField/PlayerInterface/Battlefield/BattlefieldCard/CardCounters/CardCounters';
import useAnimateCardPositionChange from './useAnimateCardPositionChange';

import styles from './Card.module.css';
import CardPreview from './CardPreview';

interface Props {
  card: CardType;
  draggable?: boolean;
  dynamicSize?: boolean;
  zone?: Zone;
  enlargeOnHover?: boolean;
  noAnimation?: boolean;
  tooltipPlacement?: TooltipPlacement;
  dropType?: DndItemTypes.CARD | DndItemTypes.LIST_CARD;
  flipped?: boolean;
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
  flipped,
  dropType = DndItemTypes.CARD,
}: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, dragRef, preview] = useDrag({
    type: dropType,
    item: card,
    canDrag: Boolean(draggable),
    end: onDropEnd,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useAnimateCardPositionChange({ card, cardRef, zone, noAnimation });

  const hidden = !('id' in card);
  const faceDown = flipped && 'flippable' in card && !card.flippable;

  useEffect(() => {
    if (dropType !== DndItemTypes.CARD) return;
    preview(getEmptyImage(), { captureDraggingState: true });
  });

  const cardComponent = (
    <div
      className={classNames(styles.card, 'card', {
        [styles.card__dynamic_size]: dynamicSize,
        [styles.card__draggable]: draggable,
        [styles.card__dragging]: isDragging,
        card__dragging: isDragging,
      })}
      ref={(val) => {
        dragRef(val);
        cardRef.current = val!;
      }}
    >
      {!hidden && !faceDown && (
        <img className={styles.image} src={getImageUrl(card.id, flipped)} />
      )}
      {faceDown && <img className={styles.image} src="/assets/images/card_back.webp" />}
      <CardCounters card={card} />
    </div>
  );

  if (!enlargeOnHover || hidden) return cardComponent;

  return cardComponent;

  // return (
  //   <CardPreview
  //     card={card}
  //     tooltipPlacement={tooltipPlacement}
  //     open={isDragging ? false : undefined}
  //   >
  //     {cardComponent}
  //   </CardPreview>
  // );
};

export default Card;
