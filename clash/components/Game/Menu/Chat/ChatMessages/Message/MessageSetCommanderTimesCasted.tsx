import React from 'react';

import { LogPayloadSetCommanderTimesCasted } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadSetCommanderTimesCasted;
}

const MessageSetCommanderTimesCasted = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
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
