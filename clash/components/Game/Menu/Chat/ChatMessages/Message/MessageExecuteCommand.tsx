import React from 'react';

import { LogPayloadExecuteCommand } from 'backend/constants/logMessages';
import { pluralize } from 'utils/i18nUtils';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadExecuteCommand;
}

const MessageExecuteCommand = ({ payload, playerId }: Props) => {
  const getCommandMessage = () => {
    if (payload.command === 'roll') {
      const sum = payload.results.reduce((acc, curr) => acc + curr, 0);
      return (
        <span>
          rolled
          <b>{` ${payload.numberOfDice > 1 ? payload.numberOfDice : 'a'} d${
            payload.sides
          } `}</b>
          and rolled
          <b> {sum}</b>
          {payload.numberOfDice > 1 && ` (${payload.results.join(', ')})`}
        </span>
      );
    }
    if (payload.command === 'flip') {
      if (payload.numberOfCoins === 1) {
        return (
          <span>
            flipped a coin and
            <b>{payload.numberOfWonFlips ? ' won ' : ' lost '}</b>
          </span>
        );
      }

      return (
        <span>
          flipped
          <b>{` ${payload.numberOfCoins} coins `}</b>
          and won
          <b>{` ${pluralize(payload.numberOfWonFlips, {
            singular: 'time',
            plural: 'times',
          })}`}</b>
        </span>
      );
    }
    return '';
  };

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>{getCommandMessage()}</span>
    </div>
  );
};

export default MessageExecuteCommand;
