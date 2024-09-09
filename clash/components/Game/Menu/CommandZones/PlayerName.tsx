import React, { CSSProperties, useContext } from 'react';
import classNames from 'classnames';
import SVG from 'react-inlinesvg';

import GameStateContext from 'components/Game/GameStateContext';
import { Player } from 'backend/database/gamestate.types';
import { LIGHT_PLAYER_COLORS } from 'constants/colors';
import { getColorVariable } from '../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from './CommandZones.module.css';

interface Props {
  player: Player;
}

const PlayerName = ({ player }: Props) => {
  const { gameState } = useContext(GameStateContext);
  const isActivePlayer = gameState?.activePlayerId === player.id;

  const displayPawIcon = player.additionalPlayerInfo?.isFurryFriend;

  const pawIcon = (
    <SVG src="/assets/mtgicons/counter-paw.svg" className={styles.player_icon} />
  );

  const isLightColor = LIGHT_PLAYER_COLORS.includes(player.color);

  return (
    <div
      className={classNames(styles.player_name, {
        [styles.player_name__active]: isActivePlayer,
        [styles.player_name__dark_text]: isLightColor,
      })}
      style={{ '--player-color': getColorVariable(player.id) } as CSSProperties}
    >
      {player.name}
      {displayPawIcon && pawIcon}
    </div>
  );
};

export default PlayerName;
