import React, { ReactNode } from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import StackedCardList from '../StackedCardList/StackedCardList';

import styles from './ZoneCardsPopover.module.css';

interface Props {
  cards: VisibleCard[];
  onDrop: (card: DropCard, index: number) => void;
  title: ReactNode;
  titleRight?: ReactNode;
  where: 'top' | 'the bottom';
}

const PopoverCardList = ({ cards, title, titleRight, where, onDrop }: Props) => {
  return (
    <div className={styles.card_list_wrapper}>
      <h4 className={styles.title}>
        <span>{title}</span>
        {titleRight && <span>{titleRight}</span>}
      </h4>
      <Dropzone onDrop={(card) => onDrop(card, 0)} disabled={Boolean(cards.length)}>
        <div className={styles.cards_list}>
          <div className={styles.cards_list_empty}>
            {`Drag Cards here to put them on ${where} of the Library`}
          </div>
          <StackedCardList cards={cards} draggable onDrop={onDrop} />
        </div>
      </Dropzone>
    </div>
  );
};

export default PopoverCardList;
