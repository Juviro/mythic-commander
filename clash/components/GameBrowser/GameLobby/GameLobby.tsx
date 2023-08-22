import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import GameBrowserModal from '../GameBrowserModal/GameBrowserModal';

import styles from './GameLobby.module.css';
import GameLobbyPlayer from './GameLobbyPlayer';
import GameBrowserContext from '../GameBrowserProvider';

const GameLobby = () => {
  const { currentLobby: lobby, user, onLeaveLobby } = useContext(GameBrowserContext);

  const playerDummies = Array.from({ length: lobby!.maxNumberOfPlayers });

  return (
    <GameBrowserModal
      title={
        <div className={styles.title}>
          <Tooltip title="Leave Lobby">
            <ArrowLeftOutlined onClick={onLeaveLobby} />
          </Tooltip>
          <span>{lobby!.name}</span>
        </div>
      }
    >
      <div className={styles.body}>
        <ul className={styles.players}>
          {playerDummies.map((_, index) => {
            const player = lobby!.players[index];
            return (
              <li key={player?.id ?? uniqid()} className={styles.player}>
                <GameLobbyPlayer
                  player={player}
                  isHost={player?.id === lobby!.hostId}
                  isSelf={player?.id === user!.id}
                  canKick={lobby!.hostId === user!.id}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </GameBrowserModal>
  );
};

export default GameLobby;
