import { getSession, validateToken } from '../../../../auth';

export default async (_, { token }, { db }) => {
  const user = await validateToken(token);

  const [dbUser] = await db('users').where({ id: user.id });

  if (!dbUser) {
    await db('users').insert(user);
  }

  const session = getSession(user.id);
  await db('sessions').insert(session);

  return { session: session.sessionId, user: dbUser ?? user };
};
