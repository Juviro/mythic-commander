import React from 'react';

import useCardActions from 'components/GameComponents/Card/cardActions/useCardActions';
import { VisibleCard, Zone } from 'backend/database/gamestate.types';
import { DndItemType } from 'types/dnd.types';
import ContextMenu from '../ContextMenu/ContextMenu';
import Card from '../Card/Card';

import styles from './StackedCardList.module.css';

interface Props {
  card: VisibleCard;
  draggable?: boolean;
  zone: Zone;
  cardDropType: DndItemType;
}

const StackedCardListCard = ({ card, draggable, zone, cardDropType }: Props) => {
  const frontCardName = card.name.split(' //')[0];
  const { contextMenuItems } = useCardActions({
    cardIds: [card.clashId],
    contextMenuTitle: frontCardName,
    zone,
  });

  return (
    <ContextMenu items={contextMenuItems}>
      <li className={styles.card}>
        <Card
          card={card}
          draggable={draggable}
          dropType={cardDropType}
          noAnimation
          zone="library"
        />
      </li>
    </ContextMenu>
  );
};

export default StackedCardListCard;
