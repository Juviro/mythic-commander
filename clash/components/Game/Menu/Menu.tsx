import React, { useContext } from 'react';

import classNames from 'classnames';
import styles from './Menu.module.css';
import Chat from './Chat/Chat';
import GameStateContext from '../GameStateContext';
import CommandZones from './CommandZones/CommandZones';
import LifeTotals from './LifeTotals/LifeTotals';
import Phases from './Phases/Phases';
import GameInfo from './GameInfo/GameInfo';

const Menu = () => {
  const { gameState } = useContext(GameStateContext);

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper__horizontal]: gameState!.players.length === 3,
      })}
    >
      <Chat />
      <div className={styles.game_state}>
        <div className={styles.game_state_players}>
          <CommandZones />
          <LifeTotals />
        </div>
        <Phases />
        <GameInfo />
      </div>
    </div>
  );
};

export default Menu;
