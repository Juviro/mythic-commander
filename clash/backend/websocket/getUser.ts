import db from '../database/db';

import { User } from './GameLobby.types';

const getUser = async (cookie?: string): Promise<User> => {
  const [__, authToken] = cookie?.match(/authToken=([\w\d]*)/) ?? [];

  if (!authToken) throw new Error('Not logged in');

  const {
    rows: [user],
  } = await db.raw(
    `SELECT users.username, users.id, users.avatar
    FROM users 
    INNER JOIN sessions 
    ON users.id = sessions."userId" 
    AND sessions.expires > NOW()
    AND sessions."sessionId" = ?`,
    [authToken]
  );

  if (!user) throw new Error('Not logged in');

  return user;
};

export default getUser;
