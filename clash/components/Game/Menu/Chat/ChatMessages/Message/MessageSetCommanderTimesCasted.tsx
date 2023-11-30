import React from 'react';

import { LogPayloadSetCommanderTimesCasted } from 'backend/constants/logMessages';
import ColoredPlayerName from '../ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerName: string;
  playerId: string;
  payload: LogPayloadSetCommanderTimesCasted;
}

const MessageSetCommanderTimesCasted = ({ payload, playerId, playerName }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} name={playerName} />
      <div>
        <span>
          {` set the commander tax of `}
          <b>{payload.commanderName}</b>
          {` from `}
          <b>{payload.previousTotal}</b>
          {` to `}
          <b>{payload.total}</b>
        </span>
      </div>
    </div>
  );
};

export default MessageSetCommanderTimesCasted;
