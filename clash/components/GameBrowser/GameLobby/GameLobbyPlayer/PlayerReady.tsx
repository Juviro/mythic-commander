import React, { ChangeEvent, useContext } from 'react';
import { CheckOutlined } from '@ant-design/icons';

import { Player } from 'backend/websocket/GameLobby.types';
import GameBrowserContext from '../../GameBrowserProvider';

import styles from './PlayerReady.module.css';

interface Props {
  player: Player;
  isSelf: boolean;
}

const PlayerReady = ({ player, isSelf }: Props) => {
  const { onReady } = useContext(GameBrowserContext);
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
