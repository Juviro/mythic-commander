import React, { CSSProperties } from 'react';

import { VisibleCard } from 'backend/database/gamestate.types';
import PopoverCardList from './PopoverCardList';
import usePopoverCards from './usePopoverCards';

import styles from './ZoneCardsPopover.module.css';

interface Props {
  searchable?: boolean;
  cards: VisibleCard[];
  color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PopoverContent = ({ cards, searchable, color }: Props) => {
  const style = { '--player-color': color };

  const { cardsToTop, cardsToBottom, onDropBottom, onDropTop } = usePopoverCards(cards);

  return (
    <div className={styles.content} style={style as CSSProperties}>
      <PopoverCardList
        cards={cardsToBottom}
        onDrop={onDropBottom}
        title="Bottom of Library"
        where="the bottom"
      />
      <PopoverCardList
        cards={cardsToTop}
        onDrop={onDropTop}
        title="Top of Library"
        where="top"
        titleRight={
          <span>
            <span>Bottom</span>
            <span> → </span>
            <span>Top</span>
          </span>
        }
      />
    </div>
  );
};

export default PopoverContent;
