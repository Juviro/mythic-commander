import React from 'react';

import { Player } from 'backend/database/gamestate.types';

import styles from './Library.module.css';

interface Props {
  player: Player;
}

const Library = ({ player }: Props) => {
  console.log('player', player);
  return (
    <div>
      <h1>Library</h1>
    </div>
  );
};

export default Library;
