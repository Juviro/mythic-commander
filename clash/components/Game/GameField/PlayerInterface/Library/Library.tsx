import React, { CSSProperties } from 'react';

import { Player } from 'backend/database/gamestate.types';

import Card from 'components/GameComponents/Card/Card';
import styles from './Library.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
}

const Library = ({ player }: Props) => {
  const { library } = player.zones;

  const cards = library.slice(0, MAX_DISPLAYED_CARDS);

  return (
    <div className={styles.wrapper}>
      {cards.map((card, index) => (
        <div
          key={card.clashId}
          className={styles.card}
          style={{ '--rotation': cards.length - index * (index % 2) } as CSSProperties}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

export default Library;
