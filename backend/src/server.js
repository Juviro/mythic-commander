import { ApolloServer, AuthenticationError } from 'apollo-server-koa';

import schema from './graphql';
import db from './database';

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    const isLogin = ctx.response.request.body.operationName === 'login';

    const authorization = ctx.request.header.authorization;
    if (!authorization) throw new AuthenticationError('invalid token');
    const sessionId = authorization.split(' ')[1];

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
  tracing: true,
  playground: {
    settings: {
      'editor.reuseHeaders': true,
      'tracing.hideTracingResponse': true,
    },
  },
});
