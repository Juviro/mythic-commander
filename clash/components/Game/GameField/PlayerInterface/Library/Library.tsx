import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import CardStack from '../CardStack/CardStack';

import StyleSheet from './Library.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
}

const Library = ({ player }: Props) => {
  const { library } = player.zones;

  const cards = library.slice(0, MAX_DISPLAYED_CARDS);

  return (
    <div className={StyleSheet.wrapper}>
      <CardStack cards={cards} />
    </div>
  );
};

export default Library;
