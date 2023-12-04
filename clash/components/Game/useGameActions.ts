import { useContext } from 'react';

import {
  MoveCardDetails,
  MoveCardPayload,
  SOCKET_MSG_GAME,
  SetPhasePayload,
  SendMessagePayload,
  SetCommanderTimesCastedPayload,
  SetPlayerLifePayload,
  PeekPayload,
  SearchLibraryPayload,
  EndPeekPayload,
} from 'backend/constants/wsEvents';
import { Phase, Zone } from 'backend/database/gamestate.types';
import SocketContext from 'components/SocketContext/SocketContextProvider';

const useGameActions = () => {
  const { socket } = useContext(SocketContext);

  const onDrawCard = () => {
    socket?.emit(SOCKET_MSG_GAME.DRAW_CARD);
  };

  const onMoveCard = (
    clashId: string,
    toZone: Zone,
    zonePlayerId: string,
    details?: MoveCardDetails
  ) => {
    const payload: MoveCardPayload = {
      clashId,
      to: { zone: toZone, playerId: zonePlayerId },
      ...details,
    };
    socket?.emit(SOCKET_MSG_GAME.MOVE_CARD, payload);
  };

  const onPeek = (playerId: string, zone: Zone, amount: number) => {
    const payload: PeekPayload = { playerId, zone, amount };
    socket?.emit(SOCKET_MSG_GAME.PEEK, payload);
  };

  const onEndPeek = (payload: EndPeekPayload) => {
    socket?.emit(SOCKET_MSG_GAME.END_PEEK, payload);
  };

  const onSearchLibrary = (playerId: string) => {
    const payload: SearchLibraryPayload = { playerId };
    socket?.emit(SOCKET_MSG_GAME.SEARCH_LIBRARY, payload);
  };

  const onSendChatMessage = (message: SendMessagePayload) => {
    socket?.emit(SOCKET_MSG_GAME.SEND_CHAT_MESSAGE, message);
  };

  const onSetCommanderTimesCasted = (commanderClashId: string, total: number) => {
    const payload: SetCommanderTimesCastedPayload = { commanderClashId, total };
    socket?.emit(SOCKET_MSG_GAME.SET_COMMANDER_TIMES_CASTED, payload);
  };

  const setPlayerLife = (forPlayerId: string, total: number) => {
    const payload: SetPlayerLifePayload = { total, forPlayerId };
    socket?.emit(SOCKET_MSG_GAME.SET_PLAYER_LIFE, payload);
  };

  const setPhase = (phase: Phase) => {
    const payload: SetPhasePayload = { phase };
    socket?.emit(SOCKET_MSG_GAME.SET_PHASE, payload);
  };

  const endTurn = () => {
    socket?.emit(SOCKET_MSG_GAME.END_TURN);
  };

  const restartGame = () => {
    socket?.emit(SOCKET_MSG_GAME.RESTART_GAME);
  };

  return {
    onDrawCard,
    onMoveCard,
    onPeek,
    onEndPeek,
    onSearchLibrary,

    onSendChatMessage,
    onSetCommanderTimesCasted,
    setPlayerLife,
    setPhase,
    endTurn,
    restartGame,
  };
};

export default useGameActions;
