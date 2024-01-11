import React from 'react';

import useGetCardActions from 'hooks/useGetCardActions';
import { VisibleCard, Zone } from 'backend/database/gamestate.types';
import { DndItemTypes } from 'types/dnd.types';
import ContextMenu from '../ContextMenu/ContextMenu';
import Card from '../Card/Card';

import styles from './StackedCardList.module.css';

interface Props {
  card: VisibleCard;
  draggable?: boolean;
  zone: Zone;
}

const StackedCardListCard = ({ card, draggable, zone }: Props) => {
  const { contextMenuItems } = useGetCardActions({
    cardIds: [card.clashId],
    contextMenuTitle: card.name,
    zone,
  });

  return (
    <ContextMenu items={contextMenuItems}>
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
    </ContextMenu>
  );
};

export default StackedCardListCard;
