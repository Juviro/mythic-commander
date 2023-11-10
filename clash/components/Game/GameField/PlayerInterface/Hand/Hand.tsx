import React from 'react';
import classNames from 'classnames';

import Card from 'components/GameComponents/Card/Card';
import { Player } from 'backend/database/gamestate.types';

import styles from './Hand.module.css';

const getMaxDegree = (length: number) => {
  if (length === 1) return 0;
  if (length === 2) return 2.5;
  if (length === 3) return 5;
  if (length === 4) return 7.5;
  if (length === 5) return 10;
  if (length === 6) return 12.5;
  if (length === 7) return 15;
  return 17.5;
};

const getRotation = (index: number, numberOfCards: number) => {
  const from = getMaxDegree(numberOfCards) * -1;
  const to = getMaxDegree(numberOfCards);

  const rotation = (from + ((to - from) / (numberOfCards - 1)) * index) * 0.5;
  return rotation;
};

const getCardStyles = (index: number, numberOfCards: number) => {
  const rotation = getRotation(index, numberOfCards);

  return {
    '--rotation': rotation,
    '--additional-hover-rotation': Math.min(numberOfCards / 10, 3),
  } as React.CSSProperties;
};

// const getRandomColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`;

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Hand = ({ player, isSelf }: Props) => {
  const { hand } = player.zones;

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.is_self]: isSelf,
      })}
    >
      {hand.map((card, index) => (
        <React.Fragment key={card.clashId}>
          <div
            className={styles.hover_element}
            style={{
              // backgroundColor: getRandomColor(),
              opacity: 0.5,
            }}
          />
          <div
            key={card.clashId}
            className={styles.card_wrapper}
            style={getCardStyles(index, hand.length)}
          >
            <div className={styles.card}>
              <Card card={card} draggable={isSelf} />
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Hand;
