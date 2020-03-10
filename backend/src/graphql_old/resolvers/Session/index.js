import { validateToken, getSession } from '../../../auth';

export default {
  Mutation: {
    login: async (_, { token }, { db }) => {
      const user = await validateToken(token);

      const [dbUser] = await db('users').where({ id: user.id });

      if (!dbUser) {
        await db('users').insert(user);
      }

      const session = getSession(user.id);
      await db('sessions').insert(session);

      // TODO: this should also return the user I guess
      return { session: session.sessionId, user };
    },
    logout: async (_, __, { user, db, session }) => {
      await db('sessions')
        .where({ id: user.id })
        .del();

      return session;
    },
  },
};
