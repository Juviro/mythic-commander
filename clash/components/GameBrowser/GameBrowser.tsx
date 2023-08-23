import React, { useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import styles from './GameBrowser.module.css';
import GameList from './GameList/GameList';
import GameLobby from './GameLobby/GameLobby';
import GameBrowserContext from './GameBrowserProvider';

const queryClient = new QueryClient();

const GameBrowser = () => {
  const { currentLobby, onLeaveLobby, onJoinLobby } = useContext(GameBrowserContext);

  useEffect(() => {
    window.location.hash = currentLobby ? `#${currentLobby.id}` : '';
  }, [Boolean(currentLobby)]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        onJoinLobby(hash);
      } else {
        onLeaveLobby();
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>{currentLobby ? <GameLobby /> : <GameList />}</div>
      </div>
    </QueryClientProvider>
  );
};

export default GameBrowser;
