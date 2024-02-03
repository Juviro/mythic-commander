import React from 'react';

import { LogPayloadAcceptHand } from 'backend/constants/logMessages';
import { pluralizeCards } from 'utils/i18nUtils';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadAcceptHand;
}

const MessageAcceptHand = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      {` choose their starting hand with `}
      <b>{`${pluralizeCards(payload.cardsKept, 'one')}`}</b>
    </div>
  );
};

export default MessageAcceptHand;
