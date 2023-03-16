import { useContext } from 'react';
import SOCKET_MSG from '../../constants/wsEvents';
import SocketContext from '../../contexts/SocketProvider';

const useGameBrowser = () => {
  const { user, emit } = useContext(SocketContext);

  const onHostGame = (name: string) => {
    emit(SOCKET_MSG.HOST_GAME, name);
  };

  return {
    games: [],
    user,
    onHostGame,
  };
};

export default useGameBrowser;
