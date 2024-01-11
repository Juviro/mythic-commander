import React from 'react';

import { LogPayloadDiscardRandomCard } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadDiscardRandomCard;
}

const MessageDiscardRandomCard = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>{` discarded a random card: `}</span>
      <b>{payload.cardName}</b>
    </div>
  );
};

export default MessageDiscardRandomCard;
