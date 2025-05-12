import React from 'react';

import { LogPayloadReturnRandomCardFromGraveyard } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadReturnRandomCardFromGraveyard;
}

const MessageReturnRandomCardFromGraveyard = ({ payload, playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>{` returned a random card from their graveyard: `}</span>
      <b>{payload.cardName}</b>
    </div>
  );
};

export default MessageReturnRandomCardFromGraveyard;
