import React, { ChangeEvent, useContext } from 'react';
import { CheckOutlined } from '@ant-design/icons';

import { LobbyPlayer } from 'backend/lobby/GameLobby.types';
import GameBrowserContext from '../../GameBrowserContext';

import styles from './PlayerReady.module.css';

interface Props {
  player: LobbyPlayer;
  isSelf: boolean;
}

const PlayerReady = ({ player, isSelf }: Props) => {
  const { onReady, currentLobby } = useContext(GameBrowserContext);

  const isHost = currentLobby?.hostId === player?.id;
  if (isHost) {
    return null;
  }

  if (!isSelf && !player.isReady) {
    return null;
  }

  if (!isSelf) {
    return <CheckOutlined className={styles.checkmark} />;
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onReady(e.target.checked);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.input_wrapper} htmlFor="ready-checkbox">
        <input
          type="checkbox"
          id="ready-checkbox"
          checked={player.isReady}
          onChange={onChange}
          className={styles.input}
        />
        <span className={styles.checkbox}>
          <CheckOutlined className={styles.checkmark} />
        </span>
      </label>
    </div>
  );
};

export default PlayerReady;
