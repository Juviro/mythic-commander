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
  bottom?: ReactNode;
  empty?: string;
}

const PopoverCardList = ({ cards, title, titleRight, empty, onDrop, bottom }: Props) => {
  return (
    <div className={styles.card_list_wrapper}>
      <h4 className={styles.title}>
        <span>{title}</span>
        {titleRight && <span>{titleRight}</span>}
      </h4>
      <Dropzone onDrop={(card) => onDrop(card, 0)} disabled={Boolean(cards.length)}>
        <div className={styles.cards_list}>
          {empty && <div className={styles.cards_list_empty}>{empty}</div>}
          <StackedCardList cards={cards} draggable onDrop={onDrop} />
        </div>
      </Dropzone>
      {bottom}
    </div>
  );
};

export default PopoverCardList;
