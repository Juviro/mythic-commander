import React, { useState } from 'react';

import ChatMessages from './ChatMessages/ChatMessages';

import styles from './Chat.module.css';
import ChatInput from './ChatInput/ChatInput';
import ChatControls, { MessageType } from './ChatControls/ChatControls';
import CardPreview from './CardPreview/CardPreview';

const GameChat = () => {
  const [enabledTypes, setEnabledTypes] = useState<MessageType[]>(['LOG', 'CHAT']);

  return (
    <div className={styles.wrapper}>
      <ChatMessages enabledTypes={enabledTypes} />
      <ChatControls enabledTypes={enabledTypes} setEnabledTypes={setEnabledTypes} />
      <ChatInput />
      <CardPreview />
    </div>
  );
};

export default GameChat;
