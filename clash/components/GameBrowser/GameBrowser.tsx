import React, { useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import styles from './GameBrowser.module.css';
import GameSelection from './GameSelection/GameSelection';
import GameLobby from './GameLobby/GameLobby';
import GameBrowserContext from './GameBrowserContext';
import BrowserWarning from './BrowserWarning/BrowserWarning';
import GameBrowserDocumentTitle from './GameBrowserDocumentTitle/GameBrowserDocumentTitle';

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
      <GameBrowserDocumentTitle currentLobby={currentLobby} />
      <BrowserWarning />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {currentLobby ? <GameLobby /> : <GameSelection />}
        </div>
        <img src="/assets/images/lobby_bg.webp" className={styles.bg_image} alt="" />
      </div>
    </QueryClientProvider>
  );
};

export default GameBrowser;
