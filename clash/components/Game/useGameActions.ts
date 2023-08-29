import { SOCKET_MSG_GAME } from 'backend/constants/wsEvents';
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
    position?: { x: number; y: number }
  ) => {
    socket?.emit(SOCKET_MSG_GAME.MOVE_CARD, { clashId, toZone, position });
  };

  return {
    onDrawCard,
    onMoveCard,
  };
};

export default useGameActions;
