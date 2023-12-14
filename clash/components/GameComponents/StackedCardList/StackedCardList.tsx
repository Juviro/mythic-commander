import React, { CSSProperties } from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import { DndItemTypes, DropCard } from 'types/dnd.types';
import Card from '../Card/Card';

import styles from './StackedCardList.module.css';
import CardListHoverElement from './CardListHoverElement';

interface Props {
  cards: VisibleCard[];
  draggable?: boolean;
  onDrop?: (item: DropCard, index: number) => void;
  color?: string;
}

const StackedCardList = ({ cards, draggable, onDrop, color }: Props) => {
  if (!cards.length) return null;

  const style = color ? ({ '--player-color': color } as CSSProperties) : undefined;

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <React.Fragment key={card.clashId}>
            {onDrop && (
              <CardListHoverElement
                onDrop={(droppedCard) => onDrop(droppedCard, index)}
                index={index}
                numberOfElements={cards.length + 1}
              />
            )}
            <div className={styles.card}>
              <Card
                card={card}
                draggable={draggable}
                dropType={DndItemTypes.LIST_CARD}
                noAnimation
                enlargeOnHover
                zone="library"
              />
            </div>
          </React.Fragment>
        ))}
        {onDrop && (
          <CardListHoverElement
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
