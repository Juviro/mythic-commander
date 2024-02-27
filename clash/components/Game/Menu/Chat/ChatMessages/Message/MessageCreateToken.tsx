import React from 'react';

import { LogPayloadCreateToken } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadCreateToken;
}

const MessageCreateToken = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {` created a `}
        <b>{payload.cardName}</b>
        {` token`}
        {payload.battlefieldPlayerId !== playerId && (
          <>
            {` for `}
            <ColoredPlayerName id={payload.battlefieldPlayerId} />
          </>
        )}
        .
      </span>
    </div>
  );
};

export default MessageCreateToken;
