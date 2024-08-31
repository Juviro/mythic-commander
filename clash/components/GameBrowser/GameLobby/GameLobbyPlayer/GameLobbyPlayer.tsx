import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import { Player } from 'backend/lobby/GameLobby.types';
import DeckSelection from './DeckSelection';
import PlayerReady from './PlayerReady';

import styles from './GameLobbyPlayer.module.css';
import ColorPicker from './ColorPicker/ColorPicker';

interface Props {
  player?: Player;
  isSelf: boolean;
  isHost: boolean;
}

const GameLobbyPlayer = ({ player, isSelf, isHost }: Props) => {
  const [imgError, setImgError] = useState(!player?.avatar);

  const onImgError = () => {
    setImgError(true);
  };

  return (
    <Card
      styles={{
        body: {
          padding: '16px 24px 16px 16px',
          minHeight: 66,
          display: 'flex',
          alignItems: 'center',
        },
      }}
      className={isSelf ? styles.card : ''}
    >
      <div className={styles.player}>
        {player ? (
          <>
            <div className={styles.player_info}>
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
              <div className={styles.deck}>
                <DeckSelection
                  deck={player.deck}
                  canSelectDeck={isSelf}
                  isReady={player.isReady}
                  playerId={player.id}
                />
              </div>
              <ColorPicker canSelectColor={isSelf} color={player.color} />
            </div>
            <PlayerReady player={player} isSelf={isSelf} />
          </>
        ) : (
          <span className={styles.empty}>Waiting for player to join...</span>
        )}
      </div>
    </Card>
  );
};

export default GameLobbyPlayer;
