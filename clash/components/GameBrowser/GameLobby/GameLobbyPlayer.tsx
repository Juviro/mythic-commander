import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

import { Card } from 'antd';
import { Player } from '../../../backend/websocket/GameLobby.types';

import styles from './GameLobbyPlayer.module.css';

interface Props {
  player?: Player;
  isSelf: boolean;
  isHost: boolean;
  canKick: boolean;
}

const GameLobbyPlayer = ({ player, isSelf, isHost, canKick }: Props) => {
  const [imgError, setImgError] = useState(!player?.avatar);

  const onImgError = () => {
    setImgError(true);
  };
  return (
    <Card
      bodyStyle={{ padding: 16, minHeight: 66 }}
      className={isSelf ? styles.card : ''}
    >
      {player && (
        <div className={styles.player}>
          {imgError ? (
            <UserOutlined className={styles.fallback_avatar} size={32} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.avatar}
              src={player.avatar}
              alt="avatar"
              onError={onImgError}
            />
          )}
          <span>{`${player.username}${isHost ? ' (Host)' : ''}`}</span>
        </div>
      )}
    </Card>
  );
};

export default GameLobbyPlayer;
