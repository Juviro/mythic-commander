import React from 'react';
import classNames from 'classnames';
import { useDrop } from 'react-dnd';

import Card from 'components/GameComponents/Card/Card';
import { Player } from 'backend/database/gamestate.types';
import { DndItemTypes } from 'types/dnd.types';
import HandHoverElement from './HandHoverElement';

import styles from './Hand.module.css';

const getMaxDegree = (length: number) => {
  if (length === 2) return 2.5;
  if (length === 3) return 5;
  if (length === 4) return 7.5;
  if (length === 5) return 10;
  if (length === 6) return 12.5;
  if (length === 7) return 15;
  return 17.5;
};

const getRotation = (index: number, numberOfCards: number) => {
  if (numberOfCards <= 1) {
    return 0;
  }

  const from = getMaxDegree(numberOfCards) * -1;
  const to = getMaxDegree(numberOfCards);

  const rotation = (from + ((to - from) / (numberOfCards - 1)) * index) * 0.5;
  return rotation;
};

const getCardStyles = (index: number, numberOfCards: number) => {
  const rotation = getRotation(index, numberOfCards);

  return {
    '--rotation': rotation,
    '--additional-hover-rotation': Math.min(numberOfCards / 2, 4),
  } as React.CSSProperties;
};

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Hand = ({ player, isSelf }: Props) => {
  const { hand } = player.zones;

  const [{ isOver }, dropRef] = useDrop({
    accept: DndItemTypes.CARD,
    drop: () => null,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper__is_self]: isSelf,
        [styles.wrapper__is_over]: isOver,
      })}
      ref={dropRef}
    >
      {hand.map((card, index) => (
        <React.Fragment key={card.clashId}>
          <HandHoverElement index={index} player={player} />
          <div
            key={card.clashId}
            className={styles.card_wrapper}
            style={getCardStyles(index, hand.length)}
          >
            <div className={styles.card}>
              <Card card={card} draggable={isSelf} zone="hand" />
            </div>
          </div>
        </React.Fragment>
      ))}
      <HandHoverElement index={hand.length} isLast player={player} />
    </div>
  );
};

export default Hand;
