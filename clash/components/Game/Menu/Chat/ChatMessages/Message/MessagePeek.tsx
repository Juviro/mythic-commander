import React from 'react';

import { LogPayloadPeek } from 'backend/constants/logMessages';
import { pluralizeCards } from 'utils/i18nUtils';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  payload: LogPayloadPeek;
  playerId: string;
}

const MessagePeek = ({ payload, playerId }: Props) => {
  const { amount, peekedPlayerId, zone } = payload;

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {` is looking at the `}
        <b>{`top ${pluralizeCards(amount)} `}</b>
        {'of '}
        {peekedPlayerId === playerId ? (
          'their'
        ) : (
          <ColoredPlayerName id={peekedPlayerId} addGenetiveSuffix />
        )}
        {` ${zone}...`}
      </span>
    </div>
  );
};

export default MessagePeek;
