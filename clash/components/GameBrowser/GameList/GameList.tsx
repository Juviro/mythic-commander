import React from 'react';

import { Empty } from 'antd';
import { Lobby, User } from '../../../backend/websocket/GameLobby.types';

import styles from './GameList.module.css';
import GameBrowserModal from '../GameBrowserModal/GameBrowserModal';
import HostGame from '../HostGame/HostGame';
import { GameOptions } from '../../../types/api.types';

interface Props {
  openLobbies: Lobby[];
  user: User | null;
  onHostLobby: (options: GameOptions) => void;
  onJoinLobby: (id: string) => void;
}

const GameList = ({ openLobbies, onJoinLobby, onHostLobby, user }: Props) => {
  return (
    <GameBrowserModal title="Game Browser">
      {openLobbies?.length ? (
        <ul className={styles.list}>
          {openLobbies.map((lobby) => (
            <li key={lobby.id} className={styles.list_item}>
              <button
                type="button"
                onClick={() => onJoinLobby(lobby.id)}
                className={styles.list_button}
              >
                <span>{lobby.name}</span>
                <span>{`${lobby.players.length} / ${lobby.maxNumberOfPlayers}`}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <Empty description="No open lobbies" />
        </div>
      )}
      <HostGame user={user} onHostLobby={onHostLobby} />
    </GameBrowserModal>
  );
};

export default GameList;
