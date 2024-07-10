import { User } from 'backend/database/getUser';
import initMatch from './initMatch';

const getPlaytestGamestate = async (gameId: string, user: User, deckId: string) => {
  const playtestLobby = {
    id: gameId,
    name: '',
    maxNumberOfPlayers: 1,
    hostId: user.id,
    players: [
      {
        ...user,
        isReady: true,
        color: 'blue',
        deck: { id: deckId },
      },
    ],
  };

  return initMatch(playtestLobby, false);
};

export default getPlaytestGamestate;
