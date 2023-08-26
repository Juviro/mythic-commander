import React from 'react';

import { Card as CardType } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';

import styles from './Card.module.css';

const CARD_BACK = '/assets/images/card_back.webp';

interface Props {
  card: CardType;
}

const Card = ({ card }: Props) => {
  const src = 'id' in card ? getImageUrl(card.id) : CARD_BACK;

  return <img className={styles.wrapper} src={src} />;
};

export default Card;
