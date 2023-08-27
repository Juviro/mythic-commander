import React, { CSSProperties, useContext } from 'react';

import { Player } from 'backend/database/gamestate.types';
import GameStateContext, { InitializedGameState } from '../GameStateContext';

import PlayerInterface from './PlayerInterface/PlayerInterface';

import styles from './GameInterfaces.module.css';

const getTranslate = (numberOfOpponents: number) => {
  if (numberOfOpponents === 1) return 30;
  if (numberOfOpponents === 2) return 50;
  return 100;
};

const GameInterfaces = () => {
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

  const scale = 1 / opponents.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.self}>
        <PlayerInterface player={player} />
      </div>
      <div
        className={styles.opponents}
        style={
          {
            '--scale': scale,
            '--translate': getTranslate(opponents.length),
          } as CSSProperties
        }
      >
        {opponents.map((otherPlayer) => (
          <PlayerInterface key={otherPlayer.id} player={otherPlayer} />
        ))}
      </div>
    </div>
  );
};

export default GameInterfaces;
