import React, { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import styles from './GameBrowser.module.css';
import GameList from './GameList/GameList';
import GameLobby from './GameLobby/GameLobby';
import GameBrowserContext from './GameBrowserProvider';

const queryClient = new QueryClient();

const GameBrowser = () => {
  const { currentLobby } = useContext(GameBrowserContext);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>{currentLobby ? <GameLobby /> : <GameList />}</div>
      </div>
    </QueryClientProvider>
  );
};

export default GameBrowser;
