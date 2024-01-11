import React from 'react';

import { Player, VisibleCard, ZONES } from 'backend/database/gamestate.types';
import useGetCardActions from 'hooks/useGetCardActions';
import Card from 'components/GameComponents/Card/Card';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';

import styles from './Hand.module.css';
import useHandCardActions from './useHandCardActions';

interface Props {
  card: VisibleCard;
  player: Player;
  isSelf?: boolean;
}

const HandCard = ({ card, isSelf, player }: Props) => {
  const { contextMenuItems } = useGetCardActions({
    cardIds: [card.clashId],
    contextMenuTitle: card.name,
    zone: ZONES.HAND,
  });
  const { handActions } = useHandCardActions(player);

  const allActions = [...contextMenuItems, ...handActions];

  return (
    <ContextMenu items={isSelf ? allActions : null}>
      <div className={styles.card}>
        <Card card={card} draggable={isSelf} zone="hand" />
      </div>
    </ContextMenu>
  );
};

export default HandCard;
