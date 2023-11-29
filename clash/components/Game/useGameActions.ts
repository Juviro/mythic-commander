import {
  MoveCardDetails,
  MoveCardPayload,
  SOCKET_MSG_GAME,
  SetCommanderTimesCastedPayload,
} from 'backend/constants/wsEvents';
import { Zone } from 'backend/database/gamestate.types';
import SocketContext from 'components/SocketContext/SocketContextProvider';
import { useContext } from 'react';

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

  const onSendChatMessage = (message: string) => {
    socket?.emit(SOCKET_MSG_GAME.SEND_CHAT_MESSAGE, message);
  };

  const onSetCommanderTimesCasted = (commanderClashId: string, amount: number) => {
    const payload: SetCommanderTimesCastedPayload = { commanderClashId, amount };
    socket?.emit(SOCKET_MSG_GAME.SET_COMMANDER_TIMES_CASTED, payload);
  };

  return {
    onDrawCard,
    onMoveCard,
    onSendChatMessage,
    onSetCommanderTimesCasted,
  };
};

export default useGameActions;
