import React from 'react';

import { Player } from 'backend/database/gamestate.types';

import styles from './Graveyard.module.css';
import CardStack from '../CardStack/CardStack';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
}

const Graveyard = ({ player }: Props) => {
  const { graveyard } = player.zones;

  const cards = graveyard.slice(0, MAX_DISPLAYED_CARDS);

  return (
    <div className={styles.wrapper}>
      <CardStack cards={cards} />
    </div>
  );
};

export default Graveyard;
