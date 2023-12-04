import React, { useContext } from 'react';

import { LogPayloadSearchLibrary } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  payload: LogPayloadSearchLibrary;
  playerId: string;
}

const MessageSearchLibrary = ({ payload, playerId }: Props) => {
  const { libraryPlayerId } = payload;
  const { playerNames } = useContext(GameStateContext);

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} name={playerNames[playerId]} />
      {` is searching `}
      {libraryPlayerId === playerId ? (
        'their'
      ) : (
        <ColoredPlayerName
          id={libraryPlayerId}
          name={playerNames[libraryPlayerId]}
          addGenetiveSuffix
        />
      )}
      {` library`}
    </div>
  );
};

export default MessageSearchLibrary;
