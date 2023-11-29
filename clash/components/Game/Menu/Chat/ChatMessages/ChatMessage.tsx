import React, { useContext, useMemo } from 'react';

import { GameLog } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';

import styles from '../Chat.module.css';
import MessageDraw from './MessageDraw';
import MessageMove from './MessageMove';
import MessageChat from './MessageChat';
import MessageSetCommanderTimesCasted from './MessageSetCommanderTimesCasted';

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
  if (logKey === 'CHAT_MESSAGE') {
    return <MessageChat playerName={playerName} playerId={playerId} message={payload} />;
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

  return <div className={styles.message}>{logKey}</div>;
};

export default ChatMessage;
