import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';

import useGameActions from 'components/Game/useGameActions';
import { Player, VisibleCard, ZONES } from 'backend/database/gamestate.types';
import { DndItemTypes, DropCard } from 'types/dnd.types';

import CardPositionContext from 'components/Game/CardPositionContext';
import styles from './Hand.module.css';

interface Props {
  player: Player;
  index: number;
  isLast?: boolean;
  card?: VisibleCard;
}

const HandHoverElement = ({ index, isLast, player, card }: Props) => {
  const { onMoveCard } = useGameActions();
  const { setHoveredCard } = useContext(CardPositionContext);
  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.HAND, player.id, { index });
  };

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: [DndItemTypes.CARD, DndItemTypes.LIST_CARD],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      className={classNames(styles.hover_element, {
        [styles.hover_element__is_over]: isOver,
        [styles.hover_element__can_drop]: canDrop,
        [styles.hover_element__last]: isLast,
      })}
      onMouseEnter={card ? () => setHoveredCard(card) : undefined}
      onMouseLeave={() => setHoveredCard(null)}
      ref={dropRef}
    />
  );
};

export default HandHoverElement;
