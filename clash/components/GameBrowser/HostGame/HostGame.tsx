import { Button } from 'antd';
import React, { useContext, useState } from 'react';

import HostGameModal from './HostGameModal';
import GameBrowserContext from '../GameBrowserContext';

import styles from './HostGame.module.css';

const HostGame = () => {
  const { user } = useContext(GameBrowserContext);
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
      {user?.username && isOpen && <HostGameModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default HostGame;
