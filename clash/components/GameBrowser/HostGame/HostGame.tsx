import { Button } from 'antd';
import React, { useState } from 'react';
import { User } from '../../../contexts/SocketProvider';

import styles from './HostGame.module.css';
import HostGameModal from './HostGameModal';

interface Props {
  user: User | null;
  onHostGame: (name: string) => void;
}

const HostGame = ({ user, onHostGame }: Props) => {
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
          onHostGame={onHostGame}
          user={user}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default HostGame;
