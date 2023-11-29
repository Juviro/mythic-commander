import React from 'react';

import { LogPayloadSetCommanderTimesCasted } from 'backend/constants/logMessages';
import ColoredPlayerName from './ColoredPlayerName';

import styles from '../Chat.module.css';

interface Props {
  playerName: string;
  playerId: string;
  payload: LogPayloadSetCommanderTimesCasted;
}

const getAmountLabel = (amount: number) => {
  switch (amount) {
    case 1:
      return '1st';
    case 2:
      return '2nd';
    case 3:
      return '3rd';
    default:
      return `${amount}th`;
  }
};

const MessageSetCommanderTimesCasted = ({ payload, playerId, playerName }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} name={playerName} />
      <span>
        {` casted `}
        <b>{payload.commanderName}</b>
        {` for the `}
        <b>{getAmountLabel(payload.amount)}</b>
        {` time`}
      </span>
    </div>
  );
};

export default MessageSetCommanderTimesCasted;
