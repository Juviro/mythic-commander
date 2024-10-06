import React, { useContext, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { Card as CardType, VisibleCard, Zone } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';
import { DndItemType, DndItemTypes } from 'types/dnd.types';
import CardCounters from 'components/Game/GameField/PlayerInterface/Battlefield/BattlefieldCard/CardCounters/CardCounters';
import CardVisibility from 'components/Game/GameField/PlayerInterface/Battlefield/BattlefieldCard/CardVisibility/CardVisibility';
import CardPositionContext from 'components/Game/CardPositionContext';
import useAnimateCardPositionChange from './useAnimateCardPositionChange';

import styles from './Card.module.css';

interface Props {
  card: CardType;
  draggable?: boolean;
  dynamicSize?: boolean;
  zone?: Zone;
  noAnimation?: boolean;
  dropType?: DndItemType;
  transformed?: boolean;
  noPreview?: boolean;
}

const Card = ({
  card,
  draggable,
  dynamicSize,
  zone,
  noAnimation,
  transformed,
  noPreview,
  dropType = DndItemTypes.CARD,
}: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { setHoveredCard } = useContext(CardPositionContext);

  const [{ isDragging }, dragRef, preview] = useDrag({
    type: dropType,
    item: { ...card, noPreview },
    canDrag: Boolean(draggable),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useAnimateCardPositionChange({ card, cardRef, zone, noAnimation });

  const hidden = !('id' in card) || !card.id || ('faceDown' in card && card.faceDown);
  const faceDown =
    ('faceDown' in card && card.faceDown) ||
    (transformed && !(card as VisibleCard).transformable);
  const isCardKnown = 'name' in card;

  useEffect(() => {
    if (dropType !== DndItemTypes.CARD || noPreview) return;
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
      onMouseEnter={!isCardKnown ? undefined : () => setHoveredCard(card)}
      onMouseLeave={!isCardKnown ? undefined : () => setHoveredCard(null)}
    >
      {!hidden && (
        <img className={styles.image} src={getImageUrl(card.id!, transformed)} />
      )}
      {faceDown && <img className={styles.image} src="/assets/images/card_back.webp" />}
      <CardCounters card={card} />
      <CardVisibility card={card} />
    </div>
  );
};

export default Card;
