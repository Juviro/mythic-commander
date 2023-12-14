import React, { useContext } from 'react';
import classNames from 'classnames';

import { Player } from 'backend/database/gamestate.types';
import GameStateContext, { InitializedGameState } from '../GameStateContext';
import Menu from '../Menu/Menu';
import PlayerInterface from './PlayerInterface/PlayerInterface';

import styles from './PlayerInterfaces.module.css';
import DragLayer from './DragLayer/DragLayer';

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
    <>
      <div className={styles.wrapper}>
        {opponents.map((opponent, index) => (
          <div
            key={opponent.id}
            style={{ gridArea: `player${index + 1}` }}
            className={classNames(styles.opponent, {
              flipped: index < 2,
            })}
          >
            <PlayerInterface player={opponent} isFlipped={index < 2} />
          </div>
        ))}
        <div style={{ gridArea: `player${gameState.players.length}` }}>
          <PlayerInterface player={player} isSelf isFlipped={false} />
        </div>
        <Menu />
      </div>
      <DragLayer />
    </>
  );
};

export default PlayerInterfaces;
