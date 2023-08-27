import React from 'react';

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

const getRotation = (index: number, length: number) => {
  const from = getMaxDegree(length) * -1;
  const to = getMaxDegree(length);

  return from + ((to - from) / (length - 1)) * index;
};

interface Props {
  player: Player;
}

const Hand = ({ player }: Props) => {
  const { hand } = player.zones;

  return (
    <div className={styles.wrapper}>
      {hand.map((card, index) => (
        <div
          key={card.clashId}
          className={styles.card_wrapper}
          style={
            {
              '--rotation': getRotation(index, hand.length),
            } as React.CSSProperties
          }
        >
          <div className={styles.card}>
            <Card card={card} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hand;
