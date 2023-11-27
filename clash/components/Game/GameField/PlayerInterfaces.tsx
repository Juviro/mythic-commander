import React, { useContext } from 'react';

import { Player } from 'backend/database/gamestate.types';
import GameStateContext, { InitializedGameState } from '../GameStateContext';

import PlayerInterface from './PlayerInterface/PlayerInterface';

import styles from './PlayerInterfaces.module.css';
import Menu from '../Menu/Menu';

const PlayerInterfaces = () => {
  const { gameState, player } = useContext(GameStateContext) as InitializedGameState;

  const opponentsAfterSelf: Player[] = [];
  const opponentsBeforeSelf: Player[] = [];
  let foundSelf = false;

  gameState.players.forEach((p) => {
    if (p.id === player.id) {
      foundSelf = true;
    } else if (foundSelf) {
      opponentsAfterSelf.push(p);
    } else {
      opponentsBeforeSelf.push(p);
    }
  });

  const opponents = [...opponentsAfterSelf, ...opponentsBeforeSelf];

  return (
    <div className={styles.wrapper}>
      {opponents.map((opponent, index) => (
        <div
          key={opponent.id}
          style={{ gridArea: `player${index + 1}` }}
          className={`${styles.opponent} opponent`}
        >
          <PlayerInterface player={opponent} />
        </div>
      ))}
      <div style={{ gridArea: `player${gameState.players.length}` }}>
        <PlayerInterface player={player} isSelf />
      </div>
      <Menu />
    </div>
  );
};

export default PlayerInterfaces;
