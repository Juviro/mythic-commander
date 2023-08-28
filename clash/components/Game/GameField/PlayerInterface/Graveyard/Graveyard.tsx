import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import GraveyardImage from 'public/assets/icons/graveyard.svg';
import CardStack from '../CardStack/CardStack';

import styles from './Graveyard.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
}

const Graveyard = ({ player }: Props) => {
  const { graveyard } = player.zones;

  const cards = graveyard.slice(0, MAX_DISPLAYED_CARDS);

  return (
    <div className={styles.wrapper}>
      <CardStack cards={cards} emptyImage={<GraveyardImage />} />
    </div>
  );
};

export default Graveyard;
