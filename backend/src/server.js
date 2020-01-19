import { ApolloServer, AuthenticationError } from 'apollo-server-koa';

import schema from './graphql';
import db from './database';

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    const header = ctx.request.header;
    const isLogin = ctx.response.request.body.operationName === 'login';
    const sessionId = header.authorization.split(' ')[1];

    const context = {
      db,
      session: { id: sessionId },
    };

    if (isLogin) {
      return context;
    }

    const {
      rows: [user],
    } = await db.raw(
      `SELECT users.* 
      FROM users 
      INNER JOIN sessions 
      ON users.id = sessions."userId" 
      AND sessions.expires > NOW()
      AND sessions."sessionId" = ?`,
      [sessionId]
    );

    if (!user) throw new AuthenticationError('invalid token');

    return { ...context, user };
  },
  formatError: error => {
    console.error('error', error);
    return error;
  },
});
