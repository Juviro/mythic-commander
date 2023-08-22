import React from 'react';

import styles from './GameBrowser.module.css';
import GameList from './GameList/GameList';
import useGameBrowser from './useGameBrowser';
import GameLobby from './GameLobby/GameLobby';
import { User } from '../../backend/websocket/GameLobby.types';

const GameBrowser = () => {
  const { user, openLobbies, onHostLobby, onJoinLobby, currentLobby, onLeaveLobby } =
    useGameBrowser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {currentLobby ? (
          <GameLobby
            user={user as User}
            lobby={currentLobby}
            onLeaveLobby={onLeaveLobby}
          />
        ) : (
          <GameList
            openLobbies={openLobbies}
            onJoinLobby={onJoinLobby}
            user={user}
            onHostLobby={onHostLobby}
          />
        )}
      </div>
    </div>
  );
};

export default GameBrowser;
