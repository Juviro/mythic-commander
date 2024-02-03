import React from 'react';

import { LogPayloadMulligan } from 'backend/constants/logMessages';
import { getCardinalNumberLabel } from 'utils/i18nUtils';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadMulligan;
}

const MessageTakeMulligan = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      {` took their `}
      <b>{getCardinalNumberLabel(payload.mulligansTaken)}</b>
      {` mulligan`}
    </div>
  );
};

export default MessageTakeMulligan;
