import React from 'react';
import { Input } from 'antd';

import ChatMessages from './ChatMessages';

import styles from './Chat.module.css';

const GameChat = () => {
  return (
    <div className={styles.wrapper}>
      <ChatMessages />
      <Input placeholder="Insult the other players..." />
    </div>
  );
};

export default GameChat;
