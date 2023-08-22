import React, { useContext } from 'react';

import { Empty } from 'antd';

import styles from './GameList.module.css';
import GameBrowserModal from '../GameBrowserModal/GameBrowserModal';
import HostGame from '../HostGame/HostGame';
import GameBrowserContext from '../GameBrowserProvider';

const GameList = () => {
  const { openLobbies, onJoinLobby } = useContext(GameBrowserContext);

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
      <HostGame />
    </GameBrowserModal>
  );
};

export default GameList;
