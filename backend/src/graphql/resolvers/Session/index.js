import { validateToken, getSession } from '../../../auth';

export default {
  Mutation: {
    login: async (_, { token }, { db }) => {
      const user = await validateToken(token);

      const [dbUser] = await db('users').where({ id: user.id });

      if (!dbUser) {
        await db('users').insert(user);
      }

      // TODO delete old sessions

      const session = getSession(user.id);
      await db('sessions').insert(session);

      return { session: session.sessionId };
    },
    logout: async (_, _1, { user, db, session }) => {
      // TODO ?
      await db('sessions')
        .where({ id: user.id })
        .del();

      return session;
    },
  },
};
