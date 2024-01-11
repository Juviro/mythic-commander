import React from 'react';

import { LogPayloadMill } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';
import { pluralizeCards } from '../util';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadMill;
}

const MessageMill = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      {` milled `}
      <b>{pluralizeCards(payload.amount, 'a')}</b>
    </div>
  );
};

export default MessageMill;
