import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './HostGame.module.css';
import HostGameModal from './HostGameModal';
import { GameOptions } from '../../../types/api.types';
import { User } from '../../../backend/websocket/GameLobby.types';

interface Props {
  user: User | null;
  onHostLobby: (options: GameOptions) => void;
}

const HostGame = ({ user, onHostLobby }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.actions}>
      <Button
        type="primary"
        onClick={user ? () => setIsOpen(true) : undefined}
        loading={!user}
      >
        Host Match
      </Button>
      {user?.username && isOpen && (
        <HostGameModal
          onHostLobby={onHostLobby}
          user={user}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default HostGame;
