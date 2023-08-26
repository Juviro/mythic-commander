import React from 'react';

import { Card as CardType } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';

import styles from './Card.module.css';

interface Props {
  card: CardType;
}

const Card = ({ card }: Props) => {
  return <img className={styles.wrapper} alt={card.name} src={getImageUrl(card.id)} />;
};

export default Card;
