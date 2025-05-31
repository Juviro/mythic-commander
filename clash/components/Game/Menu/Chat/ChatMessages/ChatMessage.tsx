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
import MessageMill from './Message/MessageMill';
import MessageTakeMulligan from './Message/MessageTakeMulligan';
import MessageAcceptHand from './Message/MessageAcceptHand';
import MessagePlayerDefeated from './Message/MessagePlayerDefeated';
import MessageExecuteCommand from './Message/MessageExecuteCommand';
import MessageCreateToken from './Message/MessageCreateToken';
import MessageCopyCard from './Message/MessageCopyCard';
import MessageTurnFaceDown from './Message/MessageTurnFaceDown';
import MessageAddCounters from './Message/MessageAddCounters';
import MessagePeekFaceDown from './Message/MessagePeekFaceDown';
import MessagePlayTopCardFaceDown from './Message/MessagePlayTopCardFaceDown';
import MessageSetCommanderDamage from './Message/MessageSetCommanderDamage';
import MessageRollPlanarDice from './Message/MessageRollPlanarDice';
import MessagePlaneswalk from './Message/MessagePlaneswalk';
import MessageReturnRandomCardFromGraveyard from './Message/MessageReturnRandomCardFromGraveyard';
import MessageUndo from './Message/MessageUndo';

interface Props {
  message: GameLog;
}

const ChatMessage = ({ message }: Props) => {
  const { logKey, payload, playerId } = message;

  if (logKey === 'PLAYER_DEFEATED') {
    return <MessagePlayerDefeated playerId={playerId} />;
  }
  if (logKey === 'ACCEPT_HAND') {
    return <MessageAcceptHand playerId={playerId} payload={payload} />;
  }
  if (logKey === 'TAKE_MULLIGAN') {
    return <MessageTakeMulligan playerId={playerId} payload={payload} />;
  }
  if (logKey === 'DRAW_CARD') {
    return <MessageDraw playerId={playerId} payload={payload} />;
  }
  if (logKey === 'MOVE_CARDS') {
    return <MessageMove playerId={playerId} payload={payload} />;
  }
  if (logKey === 'DISCARD_RANDOM_CARD') {
    return <MessageDiscardRandomCard playerId={playerId} payload={payload} />;
  }
  if (logKey === 'MILL') {
    return <MessageMill playerId={playerId} payload={payload} />;
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
  if (logKey === 'CREATE_TOKEN') {
    return <MessageCreateToken playerId={playerId} payload={payload} />;
  }
  if (logKey === 'COPY_CARD') {
    return <MessageCopyCard playerId={playerId} payload={payload} />;
  }
  if (logKey === 'ADD_COUNTERS') {
    return <MessageAddCounters playerId={playerId} payload={payload} />;
  }
  if (logKey === 'TURN_FACE_DOWN') {
    return <MessageTurnFaceDown playerId={playerId} payload={payload} />;
  }
  if (logKey === 'PEEK_FACE_DOWN') {
    return <MessagePeekFaceDown playerId={playerId} payload={payload} />;
  }
  if (logKey === 'PLAY_TOP_CARD_FACE_DOWN') {
    return <MessagePlayTopCardFaceDown playerId={playerId} payload={payload} />;
  }

  if (logKey === 'CHAT_MESSAGE') {
    return <MessageChat playerId={playerId} message={payload.message} />;
  }
  if (logKey === 'EXECUTE_COMMAND') {
    return <MessageExecuteCommand playerId={playerId} payload={payload} />;
  }
  if (logKey === 'SET_COMMANDER_TIMES_CASTED') {
    return <MessageSetCommanderTimesCasted playerId={playerId} payload={payload} />;
  }
  if (logKey === 'SET_LIFE') {
    return <MessageSetLife playerId={playerId} payload={payload} />;
  }
  if (logKey === 'SET_COMMANDER_DAMAGE') {
    return <MessageSetCommanderDamage playerId={playerId} payload={payload} />;
  }
  if (logKey === 'SET_ACTIVE_PLAYER') {
    return <MessageSetActivePlayer payload={payload} />;
  }
  if (logKey === 'SET_PHASE') {
    return <MessageSetPhase payload={payload} />;
  }
  if (logKey === 'ROLL_PLANAR_DICE') {
    return <MessageRollPlanarDice playerId={playerId} payload={payload} />;
  }
  if (logKey === 'PLANESWALK') {
    return <MessagePlaneswalk playerId={playerId} payload={payload} />;
  }
  if (logKey === 'RETURN_RANDOM_CARD_FROM_GRAVEYARD') {
    return <MessageReturnRandomCardFromGraveyard playerId={playerId} payload={payload} />;
  }
  if (logKey === 'UNDO') {
    return <MessageUndo playerId={playerId} payload={payload} />;
  }

  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    return (
      <div className={styles.message}>{`${logKey} ${JSON.stringify({ payload })}`}</div>
    );
  }

  return null;
};

export default ChatMessage;
