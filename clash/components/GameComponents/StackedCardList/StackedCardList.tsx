import React, { CSSProperties, WheelEvent } from 'react';

import { VisibleCard, Zone } from 'backend/database/gamestate.types';
import { DndItemType, DndItemTypes, DropCard } from 'types/dnd.types';

import classNames from 'classnames';
import styles from './StackedCardList.module.css';
import CardListHoverElement from './CardListHoverElement';
import StackedCardListCard from './StackedCardListCard';

interface Props {
  cards: VisibleCard[];
  draggable?: boolean;
  onDrop?: (item: DropCard, index: number) => void;
  color?: string;
  zone: Zone;
  cardDropType?: DndItemType;
  visibleOverflow?: boolean;
}

const StackedCardList = ({
  cards,
  draggable,
  onDrop,
  color,
  zone,
  visibleOverflow,
  cardDropType = DndItemTypes.LIST_CARD,
}: Props) => {
  const listRef = React.useRef<HTMLUListElement>(null);
  if (!cards.length) return null;

  const style = color ? ({ '--player-color': color } as CSSProperties) : undefined;

  // Allow scrolling horizontally with the mouse wheel
  const onWheel = (e: WheelEvent) => {
    if (!listRef.current || e.deltaX) return;
    listRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className={styles.wrapper} style={style}>
      <ul
        className={classNames(styles.cards, {
          [styles.cards__visible_overflow]: visibleOverflow,
        })}
        ref={listRef}
        onWheel={onWheel}
      >
        {cards.map((card, index) => (
          <React.Fragment key={card.clashId}>
            {onDrop && (
              <CardListHoverElement
                accept={cardDropType}
                onDrop={(droppedCard) => onDrop(droppedCard, index)}
                index={index}
                numberOfElements={cards.length + 1}
              />
            )}
            <StackedCardListCard
              card={card}
              draggable={draggable}
              zone={zone}
              cardDropType={cardDropType}
            />
          </React.Fragment>
        ))}
        {onDrop && (
          <CardListHoverElement
            accept={cardDropType}
            onDrop={(droppedCard) => onDrop(droppedCard, cards.length)}
            index={cards.length}
            numberOfElements={cards.length + 1}
          />
        )}
      </ul>
    </div>
  );
};

export default StackedCardList;
