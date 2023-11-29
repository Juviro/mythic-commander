import React, { useState } from 'react';

import ChatMessages from './ChatMessages/ChatMessages';

import styles from './Chat.module.css';
import ChatInput from './ChatInput/ChatInput';
import ChatControls, { MessageType } from './ChatControls/ChatControls';

const GameChat = () => {
  const [enabledTypes, setEnabledTypes] = useState<MessageType[]>(['LOG', 'CHAT']);

  return (
    <div className={styles.wrapper}>
      <ChatMessages enabledTypes={enabledTypes} />
      <ChatControls enabledTypes={enabledTypes} setEnabledTypes={setEnabledTypes} />
      <ChatInput />
    </div>
  );
};

export default GameChat;
