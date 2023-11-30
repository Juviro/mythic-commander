import React, { CSSProperties, useContext } from 'react';
import classNames from 'classnames';

import GameStateContext from 'components/Game/GameStateContext';
import { Player } from 'backend/database/gamestate.types';
import { getColorVariable } from '../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from './CommandZones.module.css';

interface Props {
  player: Player;
}

const PlayerName = ({ player }: Props) => {
  const { gameState } = useContext(GameStateContext);
  const isActivePlayer = gameState?.activePlayerId === player.id;

  return (
    <div
      className={classNames(styles.player_name, {
        [styles.player_name__active]: isActivePlayer,
      })}
      style={{ '--player-color': getColorVariable(player.id) } as CSSProperties}
    >
      {player.name}
    </div>
  );
};

export default PlayerName;
