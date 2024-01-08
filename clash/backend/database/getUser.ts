import db from './db';

export interface User {
  id: string;
  avatar: string;
  username: string;
}

const getUser = async (cookie?: string): Promise<User> => {
  const [__, authToken] = cookie?.match(/authToken=([\w\d]*)/) ?? [];

  if (!authToken) throw new Error('Not logged in');

  const {
    rows: [user],
  } = await db.raw(
    `SELECT users.username, users.id, users.avatar, users.name
    FROM users 
    INNER JOIN sessions 
    ON users.id = sessions."userId" 
    AND sessions.expires > NOW()
    AND sessions."sessionId" = ?`,
    [authToken]
  );

  if (!user) throw new Error('Not logged in');

  const userWithUsername = {
    ...user,
    name: undefined,
    username: user.username || user.name?.split(' ')[0],
  };

  return userWithUsername;
};

export default getUser;
