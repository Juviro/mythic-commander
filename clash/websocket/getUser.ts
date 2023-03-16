import db from '../database/db';

import { User } from './GameLobby.types';

const getUser = async (cookie?: string): Promise<User> => {
  const [__, authToken] = cookie?.match(/authToken=([\w\d]*)/) ?? [];
  const {
    rows: [user],
  } = await db.raw(
    `SELECT users.username, users.id 
    FROM users 
    INNER JOIN sessions 
    ON users.id = sessions."userId" 
    AND sessions.expires > NOW()
    AND sessions."sessionId" = ?`,
    [authToken]
  );

  return user;
};

export default getUser;
