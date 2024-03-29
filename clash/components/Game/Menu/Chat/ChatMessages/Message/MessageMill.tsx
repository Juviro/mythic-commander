import React from 'react';

import { LogPayloadMill } from 'backend/constants/logMessages';
import { pluralizeCards } from 'utils/i18nUtils';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

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
