import React, { useContext, useState } from 'react';
import uniqid from 'uniqid';
import { Modal, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import GameBrowserModal from '../GameBrowserModal/GameBrowserModal';

import styles from './GameLobby.module.css';
import GameLobbyPlayer from './GameLobbyPlayer/GameLobbyPlayer';
import GameBrowserContext from '../GameBrowserProvider';
import PlayerHeader from './PlayerHeader';

const GameLobby = () => {
  const [isLeaving, setIsLeaving] = useState(false);
  const { currentLobby: lobby, user, onLeaveLobby } = useContext(GameBrowserContext);

  const playerDummies = Array.from({ length: lobby!.maxNumberOfPlayers });

  const onClickLeaveLobby = () => {
    setIsLeaving(true);
  };

  return (
    <>
      <Modal
        okButtonProps={{ danger: true }}
        open={isLeaving}
        onOk={onLeaveLobby}
        onCancel={() => setIsLeaving(false)}
        style={{ top: 'calc(50% - 100px)' }}
      >
        <p>Are you sure you want to leave the lobby?</p>
      </Modal>
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
        </div>
      </GameBrowserModal>
    </>
  );
};

export default GameLobby;
