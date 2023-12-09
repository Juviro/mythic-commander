import React from 'react';

import { LogPayloadEndPeek } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';
import { pluralizeCards } from '../util';

interface Props {
  payload: LogPayloadEndPeek;
  playerId: string;
}

const MessageEndPeek = ({ payload, playerId }: Props) => {
  const {
    amountToBottom,
    amountToTop,
    playerId: peekedPlayerId,
    randomizeBottomCards,
    shuffleLibrary,
  } = payload;

  const movedCards = Boolean(amountToBottom) || Boolean(amountToTop);

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {movedCards && ' put '}
        {Boolean(amountToTop) && (
          <>
            <b>{`${pluralizeCards(amountToTop, 'a')} on top `}</b>
            {Boolean(amountToBottom) && 'and '}
          </>
        )}
        {Boolean(amountToBottom) && (
          <b>{`${pluralizeCards(amountToBottom, 'a')} on the bottom `}</b>
        )}
        {movedCards && 'of '}
        {!movedCards && shuffleLibrary && 'shuffled '}
        {peekedPlayerId === playerId ? (
          'their'
        ) : (
          <ColoredPlayerName id={peekedPlayerId} addGenetiveSuffix />
        )}
        {` library`}
        {randomizeBottomCards && amountToBottom > 1 && ' in a random order'}
        {shuffleLibrary && movedCards && ' and shuffled'}.
      </span>
    </div>
  );
};

export default MessageEndPeek;
