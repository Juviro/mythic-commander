import React, { useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import CommandZone from './CommandZone';

import styles from './CommandZones.module.css';

const CommandZones = () => {
  const { gameState, player: self } = useContext(GameStateContext);

  const { players } = gameState!;

  return (
    <div className={styles.wrapper}>
      {players.map((player) => (
        <CommandZone player={player} key={player.id} isSelf={self?.id === player.id} />
      ))}
    </div>
  );
};

export default CommandZones;
