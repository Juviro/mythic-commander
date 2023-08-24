import React, { useContext } from 'react';
import { Button, Tooltip } from 'antd';

import GameBrowserContext from '../GameBrowserContext';

import styles from './GameLobbyFooter.module.css';

const GameLobbyFooter = () => {
  const { currentLobby, user, onStartMatch } = useContext(GameBrowserContext);

  const isHost = currentLobby?.hostId === user?.id;

  if (!isHost) {
    return null;
  }

  const allReady = currentLobby?.players.every(({ isReady }) => isReady);
  const allDecksSelected = currentLobby?.players.every(({ deck }) => deck?.id);

  const canStart = allReady && allDecksSelected;

  let tooltipText = '';
  if (!allReady) {
    tooltipText = 'Not all players are ready';
  } else if (!allDecksSelected) {
    tooltipText = 'Not all players have selected a deck';
  }

  return (
    <div className={styles.wrapper}>
      <Tooltip title={tooltipText} open={tooltipText ? false : undefined}>
        <Button
          type="primary"
          disabled={!canStart}
          onClick={canStart ? onStartMatch : undefined}
          loading={!user}
        >
          Start Match
        </Button>
      </Tooltip>
    </div>
  );
};

export default GameLobbyFooter;
