import React from 'react';

import { LogPayloadDraw } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';
import { pluralizeCards } from '../util';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadDraw;
}

const MessageDraw = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      {` drew `}
      <b>{pluralizeCards(payload.amount, 'a')}</b>
    </div>
  );
};

export default MessageDraw;
