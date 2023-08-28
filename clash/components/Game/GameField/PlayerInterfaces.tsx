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
  const originOffsetX = 100 / (opponents.length + 1) - 1;
  const originOffsetY = 60 - opponents.length * 10;
  const opponentBattlefieldHeight = 70 + opponents.length * 5;

  return (
    <div className={styles.wrapper}>
      <PlayerInterface player={player} isSelf />
      <div className={styles.opponents}>
        {opponents.map((otherPlayer) => (
          <div
            key={otherPlayer.id}
            className={styles.opponent}
            style={
              {
                '--scale': scale,
                '--origin-offset-x': originOffsetX,
                '--origin-offset-y': originOffsetY,
                '--opponent-battlefield-height': opponentBattlefieldHeight,
              } as CSSProperties
            }
          >
            <PlayerInterface player={otherPlayer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerInterfaces;
