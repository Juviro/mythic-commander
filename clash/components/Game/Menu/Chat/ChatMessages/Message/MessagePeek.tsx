import React, { useContext } from 'react';

import { LogPayloadPeek } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';
import { pluralizeCards } from '../util';

interface Props {
  payload: LogPayloadPeek;
  playerId: string;
}

const MessagePeek = ({ payload, playerId }: Props) => {
  const { amount, peekedPlayerId, zone } = payload;
  const { playerNames } = useContext(GameStateContext);

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} name={playerNames[playerId]} />
      {` looked a the top ${pluralizeCards(amount)} of `}
      {peekedPlayerId === playerId ? (
        'their'
      ) : (
        <ColoredPlayerName
          id={peekedPlayerId}
          name={playerNames[peekedPlayerId]}
          addGenetiveSuffix
        />
      )}
      {` ${zone}`}
    </div>
  );
};

export default MessagePeek;
