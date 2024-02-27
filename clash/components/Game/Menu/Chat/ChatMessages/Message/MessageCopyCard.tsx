import React from 'react';

import { LogPayloadCopyCard } from 'backend/constants/logMessages';
import { pluralize } from 'utils/i18nUtils';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadCopyCard;
}

const MessageCopyCard = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {` created `}
        <b>{pluralize(payload.amount, 'copy', 'copies', 'a')}</b>
        {` of `}
        <b>{payload.cardName}</b>
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

export default MessageCopyCard;
