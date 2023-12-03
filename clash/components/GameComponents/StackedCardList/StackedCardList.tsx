import React from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import { DropCard } from 'components/Game/Dropzone/Dropzone';
import Card from '../Card/Card';

import styles from './StackedCardList.module.css';
import CardListHoverElement from './CardListHoverElement';

interface Props {
  cards: VisibleCard[];
  draggable?: boolean;
  onDrop: (item: DropCard, index: number) => void;
}

const StackedCardList = ({ cards, draggable, onDrop }: Props) => {
  if (!cards.length) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <React.Fragment key={card.clashId}>
            <CardListHoverElement
              onDrop={(droppedCard) => onDrop(droppedCard, index)}
              index={index}
              numberOfElements={cards.length + 1}
            />
            <div className={styles.card}>
              <Card
                card={card}
                draggable={draggable}
                dropType="LIST_CARD"
                noAnimation
                enlargeOnHover
                zone="library"
              />
            </div>
          </React.Fragment>
        ))}
        <CardListHoverElement
          onDrop={(droppedCard) => onDrop(droppedCard, cards.length)}
          index={cards.length}
          numberOfElements={cards.length + 1}
        />
      </div>
    </div>
  );
};

export default StackedCardList;
