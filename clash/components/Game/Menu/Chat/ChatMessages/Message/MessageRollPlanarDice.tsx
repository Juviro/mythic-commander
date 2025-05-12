import React from 'react';

import { LogPayloadRollPlanarDice } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadRollPlanarDice;
}

const MessageRollPlanarDice = ({ payload, playerId }: Props) => {
  const getResultText = (result: string) => {
    switch (result) {
      case 'empty':
        return 'an empty side';
      case 'planeswalk':
        return 'planeswalk';
      case 'chaos':
        return 'chaos';
      default:
        return 'something that broke the server :(';
    }
  };

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {' rolled '}
        <b>{getResultText(payload.result)}</b>
        {' on the planar die'}
      </span>
    </div>
  );
};

export default MessageRollPlanarDice;
