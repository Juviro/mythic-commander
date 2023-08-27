import React, { CSSProperties, useContext } from 'react';

import { Player } from 'backend/database/gamestate.types';
import GameStateContext, { InitializedGameState } from '../GameStateContext';

import PlayerInterface from './PlayerInterface/PlayerInterface';

import styles from './PlayerInterfaces.module.css';

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

  const scale = 1 / opponents.length;

  return (
    <div className={styles.wrapper}>
      <PlayerInterface player={player} />
      {opponents.map((otherPlayer, index) => (
        <div
          key={otherPlayer.id}
          className={styles.opponent}
          style={
            {
              '--scale': scale,
              '--origin-offset-x': ((index + 1) / gameState.players.length) * 100,
              '--origin-offset-y': 60 - opponents.length * 10,
            } as CSSProperties
          }
        >
          <PlayerInterface player={otherPlayer} />
        </div>
      ))}
    </div>
  );
};

export default PlayerInterfaces;
