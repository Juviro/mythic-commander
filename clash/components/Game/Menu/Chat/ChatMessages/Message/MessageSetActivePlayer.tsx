import React from 'react';

import { LogPayloadSetActivePlayer } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  payload: LogPayloadSetActivePlayer;
}

const MessageSetActivePlayer = ({ payload: { activePlayerId } }: Props) => {
  return (
    <div className={styles.message}>
      {`It's `}
      <ColoredPlayerName id={activePlayerId} addGenetiveSuffix />
      {` turn `}
    </div>
  );
};

export default MessageSetActivePlayer;
