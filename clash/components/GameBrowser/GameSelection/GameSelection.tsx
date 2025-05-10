import React, { useContext, useEffect, useState } from 'react';

import { Tabs } from 'antd';
import GameBrowserModal from '../GameBrowserModal/GameBrowserModal';
import GameBrowserContext from '../GameBrowserContext';
import LastGames from './LastGames/LastGames';
import OpenGamesList from './OpenGamesList';

import styles from './GameSelection.module.css';

const GameSelection = () => {
  const { openLobbies, onJoinLobby } = useContext(GameBrowserContext);

  const [isMounted, setIsMounted] = useState(false);

  // This is a hack to prevent a weird animation of the tabs indicator on initial render
  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 500);
  }, []);

  const items = [
    {
      key: 'hosted',
      label: 'Open games',
      children: <OpenGamesList openLobbies={openLobbies} onJoinLobby={onJoinLobby} />,
    },
    {
      key: 'previous',
      label: 'Last Games',
      children: <LastGames />,
    },
  ];

  return (
    <GameBrowserModal title="Game Browser">
      <div className={styles.wrapper}>
        <Tabs defaultActiveKey={items[0].key} items={items} animated={isMounted} />
      </div>
    </GameBrowserModal>
  );
};

export default GameSelection;
