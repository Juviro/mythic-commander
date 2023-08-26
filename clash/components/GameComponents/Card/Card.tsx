import React from 'react';

import { Card as CardType } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';

import styles from './Card.module.css';

interface Props {
  card: CardType;
}

const Card = ({ card }: Props) => {
  const hidden = !('id' in card);

  return (
    <div className={styles.wrapper}>
      {!hidden && <img className={styles.image} src={getImageUrl(card.id)} />}
    </div>
  );
};

export default Card;
