import React from 'react';

import { LogPayloadPlayTopCardFaceDown } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadPlayTopCardFaceDown;
}

const MessagePlayTopCardFaceDown = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {`played the top card of `}
        {payload.libraryPlayerId === playerId ? (
          'their'
        ) : (
          <ColoredPlayerName id={payload.libraryPlayerId} addGenetiveSuffix />
        )}
        {` library face down`}
      </span>
    </div>
  );
};

export default MessagePlayTopCardFaceDown;
