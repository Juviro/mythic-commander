import React, { CSSProperties, useContext, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';

import {
  Card as CardType,
  VisibleCard,
  Zone,
  ZONES,
} from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';
import { DndItemType, DndItemTypes } from 'types/dnd.types';
import CardCounters from 'components/Game/GameField/PlayerInterface/Battlefield/BattlefieldCard/CardCounters/CardCounters';
import CardVisibility from 'components/Game/GameField/PlayerInterface/Battlefield/BattlefieldCard/CardVisibility/CardVisibility';
import CardPositionContext from 'components/Game/CardPositionContext';
import useHoveredCards from 'components/Game/GameField/PlayerInterface/Battlefield/BattlefieldCard/useHoveredCards';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import BackgroundFlash from 'components/lib/BackgroundFlash/BackgroundFlash';
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
  noDragPreview?: boolean;
  preventPreview?: boolean;
}

const Card = ({
  card,
  draggable,
  dynamicSize,
  zone,
  noAnimation,
  transformed,
  noDragPreview,
  preventPreview,
  dropType = DndItemTypes.CARD,
}: Props) => {
  const { getPlayerColor } = useContext(GameStateContext);
  const { hoveringCard, hoveringPlayer } = useHoveredCards(card);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { setHoveredCard } = useContext(CardPositionContext);
  const { onHoverCard } = useGameActions();

  const [{ isDragging }, dragRef, preview] = useDrag({
    type: dropType,
    item: { ...card, noDragPreview },
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
    if (dropType !== DndItemTypes.CARD || noDragPreview) return;
    preview(getEmptyImage(), { captureDraggingState: true });
  });

  const opacity = zone === ZONES.BATTLEFIELD ? 0.8 : 1;

  const style = {
    '--hovering-player-color': hoveringPlayer && getPlayerColor(hoveringPlayer, opacity),
  } as CSSProperties;

  const onMouseEnter = () => {
    if (preventPreview) return;
    onHoverCard(card.clashId);
    if (!isCardKnown) return;
    setHoveredCard(card);
  };

  const onMouseLeave = () => {
    if (preventPreview) return;
    if (!isCardKnown) return;
    setHoveredCard(null);
  };

  return (
    <div
      className={classNames(styles.card, 'card', {
        [styles.card__dynamic_size]: dynamicSize,
        [styles.card__draggable]: draggable,
        [styles.card__dragging]: isDragging,
        card__dragging: isDragging,
      })}
      style={style}
      ref={(val) => {
        dragRef(val);
        cardRef.current = val!;
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <BackgroundFlash
        active={Boolean(hoveringPlayer)}
        timestamp={hoveringCard?.timestamp ?? 0}
      />
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
