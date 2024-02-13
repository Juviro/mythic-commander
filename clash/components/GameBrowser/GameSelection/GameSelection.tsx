import React, { useContext } from 'react';

import { Tabs } from 'antd';
import GameBrowserModal from '../GameBrowserModal/GameBrowserModal';
import GameBrowserContext from '../GameBrowserContext';
import LastGames from './LastGames/LastGames';
import OpenGamesList from './OpenGamesList';

import styles from './GameSelection.module.css';

const GameSelection = () => {
  const { openLobbies, onJoinLobby } = useContext(GameBrowserContext);

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
        {/* TODO: 0 */}
        <Tabs defaultActiveKey={items[1].key} items={items} />
      </div>
    </GameBrowserModal>
  );
};

export default GameSelection;
