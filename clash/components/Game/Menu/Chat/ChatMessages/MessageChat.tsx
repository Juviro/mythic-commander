import React from 'react';

import { MessageOutlined } from '@ant-design/icons';
import ColoredPlayerName, { getColorVariable } from './ColoredPlayerName';

import styles from '../Chat.module.css';

interface Props {
  playerName: string;
  playerId: string;
  message: string;
}

const MessageChat = ({ message, playerId, playerName }: Props) => {
  return (
    <div className={styles.message}>
      <MessageOutlined style={{ color: getColorVariable(playerId) }} />
      <ColoredPlayerName id={playerId} name={`${playerName}: `} />
      <span>{message}</span>
    </div>
  );
};

export default MessageChat;
