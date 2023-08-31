import { MoveCardPayload, SOCKET_MSG_GAME } from 'backend/constants/wsEvents';
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
    position?: { x: number; y: number }
  ) => {
    const payload: MoveCardPayload = {
      clashId,
      to: { zone: toZone, playerId: zonePlayerId },
      position,
    };
    socket?.emit(SOCKET_MSG_GAME.MOVE_CARD, payload);
  };

  return {
    onDrawCard,
    onMoveCard,
  };
};

export default useGameActions;
