import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { Modal, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

import GameBrowserModal from '../GameBrowserModal/GameBrowserModal';
import GameLobbyPlayer from './GameLobbyPlayer/GameLobbyPlayer';
import GameBrowserContext from '../GameBrowserContext';
import PlayerHeader from './PlayerHeader';
import GameLobbyFooter from './GameLobbyFooter';

import styles from './GameLobby.module.css';
import PlanechaseSetsInfo from './PlanechaseSetsInfo';

const GameLobby = () => {
  const [isLeaving, setIsLeaving] = useState(false);
  const { currentLobby: lobby, user, onLeaveLobby } = useContext(GameBrowserContext);
  const router = useRouter();

  const isStartingMatch = lobby?.gameLoading;
  const isGameReady = lobby?.gameReady;

  const playerDummies = Array.from({ length: lobby!.maxNumberOfPlayers });

  const onClickLeaveLobby = () => {
    const isHost = lobby?.hostId === user?.id;
    if (isHost) {
      setIsLeaving(true);
    } else {
      onLeaveLobby();
    }
  };

  useEffect(() => {
    if (!isGameReady) return;
    router.replace('/');
    router.push(`/match/${lobby.id}`);
  }, [isGameReady]);

  return (
    <>
      <Modal
        okButtonProps={{ danger: true }}
        open={isLeaving}
        onOk={onLeaveLobby}
        okText="Close Lobby"
        onCancel={() => setIsLeaving(false)}
        style={{ top: 'calc(50% - 100px)' }}
      >
        <p>Are you sure you want to close the lobby?</p>
      </Modal>
      <div
        className={
          isStartingMatch ? styles.start_overlay_visible : styles.start_overlay_hidden
        }
      >
        <span className={styles.start_overlay_text}>Starting Match</span>
      </div>
      <GameBrowserModal
        title={
          <div className={styles.title}>
            <Tooltip title="Leave Lobby">
              <ArrowLeftOutlined onClick={onClickLeaveLobby} />
            </Tooltip>
            <span>{lobby!.name}</span>
          </div>
        }
      >
        <PlayerHeader />
        <div className={styles.body}>
          <ul className={styles.players}>
            {playerDummies.map((_, index) => {
              const player = lobby!.players[index];
              return (
                <li key={player?.id ?? uniqid()} className={styles.player}>
                  <GameLobbyPlayer
                    player={player}
                    isHost={player?.id === lobby!.hostId}
                    isSelf={player?.id === user!.id}
                  />
                </li>
              );
            })}
          </ul>
          <PlanechaseSetsInfo lobby={lobby} />
        </div>
      </GameBrowserModal>
      <GameLobbyFooter />
    </>
  );
};

export default GameLobby;
