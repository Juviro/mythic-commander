import React from 'react';

import { Player, VisibleCard, ZONES } from 'backend/database/gamestate.types';
import useCardActions from 'components/GameComponents/Card/cardActions/useCardActions';
import Card from 'components/GameComponents/Card/Card';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';

import styles from './Hand.module.css';

interface Props {
  card: VisibleCard;
  isSelf?: boolean;
  player: Player;
}

const HandCard = ({ card, isSelf, player }: Props) => {
  const frontCardName = card.name?.split(' //')[0];

  const { contextMenuItems } = useCardActions({
    cardIds: [card.clashId],
    contextMenuTitle: frontCardName,
    zone: ZONES.HAND,
    player,
  });

  return (
    <ContextMenu items={isSelf ? contextMenuItems : null}>
      <div className={styles.card}>
        <Card card={card} draggable={isSelf} zone="hand" />
      </div>
    </ContextMenu>
  );
};

export default HandCard;
