import React, { CSSProperties, useContext } from 'react';
import classNames from 'classnames';
import SVG from 'react-inlinesvg';

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

  const displayPawIcon = player.additionalPlayerInfo.isFurryFriend;

  const pawIcon = (
    <SVG src="/assets/mtgicons/counter-paw.svg" className={styles.player_icon} />
  );

  return (
    <div
      className={classNames(styles.player_name, {
        [styles.player_name__active]: isActivePlayer,
      })}
      style={{ '--player-color': getColorVariable(player.id) } as CSSProperties}
    >
      {displayPawIcon && pawIcon}
      {player.name}
    </div>
  );
};

export default PlayerName;
