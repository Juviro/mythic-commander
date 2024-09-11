import React, { ReactNode } from 'react';

import { VisibleCard, Zone } from 'backend/database/gamestate.types';
import Dropzone from 'components/Game/Dropzone/Dropzone';
import { DndItemType, DndItemTypes, DropCard } from 'types/dnd.types';
import classNames from 'classnames';
import StackedCardList from '../StackedCardList/StackedCardList';

import styles from './ZoneCardsPopover.module.css';

interface Props {
  cards: VisibleCard[];
  onDrop: (card: DropCard, index: number) => void;
  title?: ReactNode;
  titleRight?: ReactNode;
  bottom?: ReactNode;
  empty?: string;
  zone: Zone;
  cardDropType?: DndItemType;
  stackVertically?: boolean;
}

const PopoverCardList = ({
  cards,
  title,
  titleRight,
  empty,
  onDrop,
  bottom,
  zone,
  cardDropType = DndItemTypes.LIST_CARD,
  stackVertically,
}: Props) => {
  return (
    <div className={styles.card_list_wrapper}>
      {(title || titleRight) && (
        <h4 className={styles.title}>
          <span>{title}</span>
          {titleRight && <span>{titleRight}</span>}
        </h4>
      )}
      <Dropzone
        onDrop={(card) => onDrop(card, 0)}
        disabled={Boolean(cards.length)}
        accept={[cardDropType]}
      >
        <div
          className={classNames(styles.cards_list, {
            [styles.cards_list__vertical_layout]: stackVertically,
          })}
        >
          {empty && <div className={styles.cards_list_empty}>{empty}</div>}
          <StackedCardList
            stackVertically={stackVertically}
            cards={cards}
            draggable
            onDrop={onDrop}
            zone={zone}
            cardDropType={cardDropType}
          />
        </div>
      </Dropzone>
      {bottom}
    </div>
  );
};

export default PopoverCardList;
