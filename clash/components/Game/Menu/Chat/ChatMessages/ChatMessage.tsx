import React, { useContext, useMemo } from 'react';

import { GameLog } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';

import styles from '../Chat.module.css';
import MessageDraw from './Message/MessageDraw';
import MessageMove from './Message/MessageMove';
import MessageChat from './Message/MessageChat';
import MessageSetCommanderTimesCasted from './Message/MessageSetCommanderTimesCasted';
import MessageSetLife from './Message/MessageSetLife';
import MessageSetActivePlayer from './Message/MessageSetActivePlayer';
import MessageSetPhase from './Message/MessageSetPhase';
import MessagePeek from './Message/MessagePeek';

interface Props {
  message: GameLog;
}

const ChatMessage = ({ message }: Props) => {
  const { gameState } = useContext(GameStateContext);

  const playerName = useMemo(() => {
    const player = gameState?.players.find((p) => p.id === message.playerId);
    return player!.name;
  }, [message.playerId]);

  const { logKey, payload, playerId } = message;

  if (logKey === 'DRAW_CARD') {
    return <MessageDraw playerName={playerName} playerId={playerId} payload={payload} />;
  }
  if (logKey === 'MOVE_CARD') {
    return <MessageMove playerName={playerName} playerId={playerId} payload={payload} />;
  }
  if (logKey === 'PEEK') {
    return <MessagePeek playerId={playerId} payload={payload} />;
  }

  if (logKey === 'CHAT_MESSAGE') {
    return (
      <MessageChat
        playerName={playerName}
        playerId={playerId}
        message={payload.message}
      />
    );
  }
  if (logKey === 'SET_COMMANDER_TIMES_CASTED') {
    return (
      <MessageSetCommanderTimesCasted
        playerName={playerName}
        playerId={playerId}
        payload={payload}
      />
    );
  }
  if (logKey === 'SET_LIFE') {
    return (
      <MessageSetLife playerName={playerName} playerId={playerId} payload={payload} />
    );
  }
  if (logKey === 'SET_ACTIVE_PLAYER') {
    return <MessageSetActivePlayer payload={payload} />;
  }
  if (logKey === 'SET_PHASE') {
    return <MessageSetPhase payload={payload} />;
  }

  return (
    <div className={styles.message}>{`${logKey} ${JSON.stringify({ payload })}`}</div>
  );
};

export default ChatMessage;
