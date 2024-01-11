import React from 'react';

import { GameLog } from 'backend/constants/logMessages';

import styles from '../Chat.module.css';
import MessageDraw from './Message/MessageDraw';
import MessageMove from './Message/MessageMove';
import MessageChat from './Message/MessageChat';
import MessageSetCommanderTimesCasted from './Message/MessageSetCommanderTimesCasted';
import MessageSetLife from './Message/MessageSetLife';
import MessageSetActivePlayer from './Message/MessageSetActivePlayer';
import MessageSetPhase from './Message/MessageSetPhase';
import MessagePeek from './Message/MessagePeek';
import MessageSearchLibrary from './Message/MessageSearchLibrary';
import MessageEndPeek from './Message/MessageEndPeek';
import MessageShuffleLibrary from './Message/MessageShuffleLibrary';
import MessageDiscardRandomCard from './Message/MessageDiscardRandomCard';

interface Props {
  message: GameLog;
}

const ChatMessage = ({ message }: Props) => {
  const { logKey, payload, playerId } = message;

  if (logKey === 'DRAW_CARD') {
    return <MessageDraw playerId={playerId} payload={payload} />;
  }
  if (logKey === 'MOVE_CARD') {
    return <MessageMove playerId={playerId} payload={payload} />;
  }
  if (logKey === 'DISCARD_RANDOM_CARD') {
    return <MessageDiscardRandomCard playerId={playerId} payload={payload} />;
  }
  if (logKey === 'PEEK') {
    return <MessagePeek playerId={playerId} payload={payload} />;
  }
  if (logKey === 'SHUFFLE_LIBRARY') {
    return <MessageShuffleLibrary playerId={playerId} />;
  }
  if (logKey === 'END_PEEK') {
    return <MessageEndPeek playerId={playerId} payload={payload} />;
  }
  if (logKey === 'SEARCH_LIBRARY') {
    return <MessageSearchLibrary playerId={playerId} payload={payload} />;
  }

  if (logKey === 'CHAT_MESSAGE') {
    return <MessageChat playerId={playerId} message={payload.message} />;
  }
  if (logKey === 'SET_COMMANDER_TIMES_CASTED') {
    return <MessageSetCommanderTimesCasted playerId={playerId} payload={payload} />;
  }
  if (logKey === 'SET_LIFE') {
    return <MessageSetLife playerId={playerId} payload={payload} />;
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
