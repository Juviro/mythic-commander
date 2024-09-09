import React, { useContext } from 'react';
import classNames from 'classnames';

import Chat from './Chat/Chat';
import GameStateContext from '../GameStateContext';
import CommandZones from './CommandZones/CommandZones';
import LifeTotals from './LifeTotals/LifeTotals';
import Phases from './Phases/Phases';
import GameInfo from './GameInfo/GameInfo';

import styles from './Menu.module.css';

const Menu = () => {
  const { gameState } = useContext(GameStateContext);

  const isHorizontal = gameState!.players.length === 3;

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper__horizontal]: isHorizontal,
      })}
    >
      {!isHorizontal && <GameInfo />}
      <Chat />
      <div className={styles.game_state}>
        <div className={styles.game_state_players}>
          {isHorizontal && <GameInfo />}
          <CommandZones />
          <LifeTotals />
        </div>
        <Phases />
      </div>
    </div>
  );
};

export default Menu;
