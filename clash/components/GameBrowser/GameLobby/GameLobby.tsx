import React from 'react';
import uniqid from 'uniqid';
import { Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { User, Lobby } from '../../../backend/websocket/GameLobby.types';
import GameBrowserModal from '../GameBrowserModal/GameBrowserModal';

import styles from './GameLobby.module.css';
import GameLobbyPlayer from './GameLobbyPlayer';

interface Props {
  user: User;
  lobby: Lobby;
  onLeaveLobby: () => void;
}

const GameLobby = ({ lobby, user, onLeaveLobby }: Props) => {
  const playerDummies = Array.from({ length: lobby.maxNumberOfPlayers });

  return (
    <GameBrowserModal
      title={
        <div className={styles.title}>
          <Tooltip title="Leave Lobby">
            <ArrowLeftOutlined onClick={onLeaveLobby} />
          </Tooltip>
          <span>{lobby.name}</span>
        </div>
      }
    >
      <div className={styles.body}>
        <ul className={styles.players}>
          {playerDummies.map((_, index) => {
            const player = lobby.players[index];
            return (
              <li key={player?.id ?? uniqid()} className={styles.player}>
                <GameLobbyPlayer
                  player={player}
                  isHost={player?.id === lobby.hostId}
                  isSelf={player?.id === user.id}
                  canKick={lobby.hostId === user.id}
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
