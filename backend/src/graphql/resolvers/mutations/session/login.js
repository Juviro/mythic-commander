import { getSession, validateToken } from '../../../../auth';
import randomId from '../../../../utils/randomId';

export default async (_, { token }, { db }) => {
  const googleUser = await validateToken(token);

  let dbUser = await db('users')
    .where({ googleId: googleUser.googleId })
    .first();

  if (!dbUser) {
    [dbUser] = await db('users')
      .insert({
        ...googleUser,
        lastOnline: new Date(),
        id: randomId(),
      })
      .returning('*');
  }

  const session = getSession(dbUser.id);
  await db('sessions').insert(session);

  return { session: session.sessionId, user: dbUser };
};
