import React from 'react';

import { LogPayloadPeekFaceDown } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadPeekFaceDown;
}

const MessagePeekFaceDown = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        looked at a face-down card
        {payload.battlefieldPlayerId !== playerId && (
          <>
            {` on `}
            <ColoredPlayerName id={payload.battlefieldPlayerId} addGenetiveSuffix />
            {` battlefield`}
          </>
        )}
      </span>
    </div>
  );
};

export default MessagePeekFaceDown;
