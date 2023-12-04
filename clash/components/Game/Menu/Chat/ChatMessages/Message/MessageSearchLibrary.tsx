import React from 'react';

import { LogPayloadSearchLibrary } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  payload: LogPayloadSearchLibrary;
  playerId: string;
}

const MessageSearchLibrary = ({ payload, playerId }: Props) => {
  const { libraryPlayerId } = payload;

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      {` is searching `}
      {libraryPlayerId === playerId ? (
        'their'
      ) : (
        <ColoredPlayerName id={libraryPlayerId} addGenetiveSuffix />
      )}
      {` library...`}
    </div>
  );
};

export default MessageSearchLibrary;
