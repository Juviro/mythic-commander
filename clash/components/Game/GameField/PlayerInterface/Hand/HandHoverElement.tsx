import React from 'react';

import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import useGameActions from 'components/Game/useGameActions';
import { DropCard } from 'components/Game/Dropzone/Dropzone';
import { Player, ZONES } from 'backend/database/gamestate.types';
import styles from './Hand.module.css';

interface Props {
  player: Player;
  index: number;
  isLast?: boolean;
}

const HandHoverElement = ({ index, isLast, player }: Props) => {
  const { onMoveCard } = useGameActions();
  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.HAND, player.id, { index });
  };

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'CARD',
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
      ref={dropRef}
    />
  );
};

export default HandHoverElement;
