import React from 'react';

import ChatMessages from './ChatMessages/ChatMessages';

import styles from './Chat.module.css';
import ChatInput from './ChatInput/ChatInput';

const GameChat = () => {
  return (
    <div className={styles.wrapper}>
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default GameChat;
