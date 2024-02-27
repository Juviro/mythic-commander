import React from 'react';

import { LogPayloadAddCounters } from 'backend/constants/logMessages';
import { getCountersLabel } from 'constants/counters';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadAddCounters;
}

const MessageAddCounters = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {` ${payload.subtract ? 'removed' : 'added'} `}
        {payload.amount > 1 ? (
          <b>{`${payload.amount} ${getCountersLabel(payload.type)} counters`}</b>
        ) : (
          <b>{`a ${getCountersLabel(payload.type)} counter`}</b>
        )}
        {` ${payload.subtract ? 'from' : 'to'} `}
        <b>
          {payload.cardNames.length === 1
            ? payload.cardNames[0]
            : `${payload.cardNames.length} cards`}
        </b>
        {payload.battlefieldPlayerId !== playerId && (
          <>
            {` on `}
            <ColoredPlayerName id={payload.battlefieldPlayerId} addGenetiveSuffix />
            {` battlefield`}
          </>
        )}
        .
      </span>
    </div>
  );
};

export default MessageAddCounters;
