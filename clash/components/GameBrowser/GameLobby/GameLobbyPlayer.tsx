import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

import { Card } from 'antd';
import { Player } from '../../../backend/websocket/GameLobby.types';

import styles from './GameLobbyPlayer.module.css';
import DeckSelection from './DeckSelection';

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
      bodyStyle={{ padding: 16, minHeight: 66, display: 'flex', alignItems: 'center' }}
      className={isSelf ? styles.card : ''}
    >
      <div className={styles.player}>
        {player ? (
          <>
            {imgError || !player ? (
              <UserOutlined className={styles.fallback_avatar} size={32} />
            ) : (
              <img
                className={styles.avatar}
                src={player.avatar}
                alt="avatar"
                onError={onImgError}
              />
            )}
            <span className={styles.player_name}>{`${player.username}${
              isHost ? ' (Host)' : ''
            }`}</span>
            <DeckSelection
              deck={player.deck}
              canSelectDeck={isSelf}
              playerId={player.id}
            />
          </>
        ) : (
          <span className={styles.empty}>Waiting for player to join...</span>
        )}
      </div>
    </Card>
  );
};

export default GameLobbyPlayer;
