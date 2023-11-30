import React, { useContext } from 'react';

import { LogPayloadSetActivePlayer } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';
import ColoredPlayerName from '../ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  payload: LogPayloadSetActivePlayer;
}

const MessageSetActivePlayer = ({ payload: { activePlayerId } }: Props) => {
  const { playerNames } = useContext(GameStateContext);

  return (
    <div className={styles.message}>
      {`It's `}
      <ColoredPlayerName
        id={activePlayerId}
        name={playerNames[activePlayerId]}
        addGenetiveSuffix
      />
      {` turn `}
    </div>
  );
};

export default MessageSetActivePlayer;
