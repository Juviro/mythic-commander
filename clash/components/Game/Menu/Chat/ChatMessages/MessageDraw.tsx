import React from 'react';

import { LogPayloadDraw } from 'backend/constants/logMessages';
import ColoredPlayerName from './ColoredPlayerName';
import { pluralizeCards } from './util';

import styles from '../Chat.module.css';

interface Props {
  playerName: string;
  playerId: string;
  payload: LogPayloadDraw;
}

const MessageDraw = ({ payload, playerId, playerName }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} name={playerName} />
      <span> drew {pluralizeCards(payload.amount)}</span>
    </div>
  );
};

export default MessageDraw;
