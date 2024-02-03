import React, { CSSProperties } from 'react';

import { VisibleCard, Zone } from 'backend/database/gamestate.types';
import { DndItemType, DndItemTypes, DropCard } from 'types/dnd.types';

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
}

const StackedCardList = ({
  cards,
  draggable,
  onDrop,
  color,
  zone,
  cardDropType = DndItemTypes.LIST_CARD,
}: Props) => {
  if (!cards.length) return null;

  const style = color ? ({ '--player-color': color } as CSSProperties) : undefined;

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.cards}>
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
      </div>
    </div>
  );
};

export default StackedCardList;
