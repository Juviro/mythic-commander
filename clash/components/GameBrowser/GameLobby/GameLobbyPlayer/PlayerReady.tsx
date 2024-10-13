import React, { useContext } from 'react';
import { CheckOutlined } from '@ant-design/icons';

import { LobbyPlayer } from 'backend/lobby/GameLobby.types';
import GameBrowserContext from '../../GameBrowserContext';

import styles from './PlayerReady.module.css';
import PlayerReadyButton from './PlayerReadyButton';

interface Props {
  player: LobbyPlayer;
  isSelf: boolean;
}

const PlayerReady = ({ player, isSelf }: Props) => {
  const { onReady, currentLobby } = useContext(GameBrowserContext);

  const isHost = currentLobby?.hostId === player?.id;
  if (isHost) {
    return null;
  }

  if (!isSelf && !player.isReady) {
    return null;
  }

  if (!isSelf) {
    return <CheckOutlined className={styles.checkmark} />;
  }

  return (
    <PlayerReadyButton isReady={player.isReady} canEdit={isSelf} onChange={onReady} />
  );
};

export default PlayerReady;
