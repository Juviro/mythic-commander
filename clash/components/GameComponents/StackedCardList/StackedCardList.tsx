import React, { CSSProperties, useEffect, useRef, WheelEvent } from 'react';

import { HiddenCard, VisibleCard, Zone } from 'backend/database/gamestate.types';
import { DndItemType, DndItemTypes, DropCard } from 'types/dnd.types';

import classNames from 'classnames';
import CardListHoverElement from './CardListHoverElement';
import StackedCardListCard from './StackedCardListCard';

import styles from './StackedCardList.module.css';

interface Props {
  cards: (VisibleCard | HiddenCard)[];
  draggable?: boolean;
  onDrop?: (item: DropCard, index: number) => void;
  color?: string;
  zone: Zone;
  cardDropType?: DndItemType;
  stackVertically?: boolean;
}

const StackedCardList = ({
  cards,
  draggable,
  onDrop,
  color,
  zone,
  cardDropType = DndItemTypes.LIST_CARD,
  stackVertically,
}: Props) => {
  const numberOfCardsRef = useRef(cards.length);
  const listRef = React.useRef<HTMLUListElement>(null);

  const style = color ? ({ '--player-color': color } as CSSProperties) : undefined;

  useEffect(() => {
    if (numberOfCardsRef.current === cards.length || !listRef.current) return;

    listRef.current.scrollLeft = listRef.current.scrollWidth;
    numberOfCardsRef.current = cards.length;
  }, [cards.length]);

  // Allow scrolling horizontally with the mouse wheel
  const onWheel = (e: WheelEvent) => {
    if (!listRef.current || !e.deltaY) return;
    listRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className={styles.wrapper} style={style}>
      <ul
        className={classNames(styles.cards, {
          [styles.cards__vertical_layout]: stackVertically,
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
              verticalOffsetIndex={stackVertically ? index : undefined}
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
