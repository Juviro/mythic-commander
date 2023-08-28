import { SOCKET_MSG_GAME } from 'backend/constants/wsEvents';
import SocketContext from 'components/SocketContext/SocketContextProvider';
import { useContext } from 'react';

const useGameActions = () => {
  const { socket } = useContext(SocketContext);

  const onDrawCard = () => {
    socket?.emit(SOCKET_MSG_GAME.DRAW_CARD);
  };

  return {
    onDrawCard,
  };
};

export default useGameActions;
