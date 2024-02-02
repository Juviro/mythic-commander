import React, { useContext, useEffect, useRef } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import classNames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { Card as CardType, Zone } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';
import { DndItemTypes, DropCard } from 'types/dnd.types';
import CardCounters from 'components/Game/GameField/PlayerInterface/Battlefield/BattlefieldCard/CardCounters/CardCounters';
import CardPositionContext from 'components/Game/CardPositionContext';
import useAnimateCardPositionChange from './useAnimateCardPositionChange';

import styles from './Card.module.css';

interface Props {
  card: CardType;
  draggable?: boolean;
  dynamicSize?: boolean;
  zone?: Zone;
  noAnimation?: boolean;
  dropType?: DndItemTypes.CARD | DndItemTypes.LIST_CARD;
  flipped?: boolean;
  onDropEnd?: (item: DropCard, monitor: DragSourceMonitor<DropCard>) => void;
}

const Card = ({
  card,
  draggable,
  dynamicSize,
  zone,
  noAnimation,
  onDropEnd,
  flipped,
  dropType = DndItemTypes.CARD,
}: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { setHoveredCard } = useContext(CardPositionContext);

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

  return (
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
      onMouseEnter={hidden ? undefined : () => setHoveredCard(card)}
      onMouseLeave={hidden ? undefined : () => setHoveredCard(null)}
    >
      {!hidden && !faceDown && (
        <img className={styles.image} src={getImageUrl(card.id, flipped)} />
      )}
      {faceDown && <img className={styles.image} src="/assets/images/card_back.webp" />}
      <CardCounters card={card} />
    </div>
  );
};

export default Card;
