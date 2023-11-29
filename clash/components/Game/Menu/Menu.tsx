import React, { useContext } from 'react';

import classNames from 'classnames';
import styles from './Menu.module.css';
import Chat from './Chat/Chat';
import GameStateContext from '../GameStateContext';
import CommandZones from './CommandZones/CommandZones';

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
        <CommandZones />
      </div>
    </div>
  );
};

export default Menu;
