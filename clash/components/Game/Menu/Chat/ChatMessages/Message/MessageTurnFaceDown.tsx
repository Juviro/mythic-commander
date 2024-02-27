import React from 'react';

import { LogPayloadTurnFaceDown } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadTurnFaceDown;
}

const MessageTurnFaceDown = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {` turned `}
        <b>
          {payload.cardNames.length === 1
            ? payload.cardNames[0]
            : `${payload.cardNames.length} cards`}
        </b>
        {` face ${payload.faceDown ? 'down' : 'up'}`}
        {payload.cardNames.length > 1 && (
          <span className={styles.cardNames}>{` (${payload.cardNames.join(', ')})`}</span>
        )}
        .
      </span>
    </div>
  );
};

export default MessageTurnFaceDown;
