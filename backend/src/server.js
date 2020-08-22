import { ApolloServer, AuthenticationError } from 'apollo-server-koa';

import schema from './graphql';
import db from './database';

const UNAUTHENTICATED_ACTIONS = ['login', 'cachedCards', 'numberOfCachedCards'];

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    const context = {
      db,
    };

    const operationName = ctx.response.request.body.operationName;
    const noAuthentication =
      !operationName || UNAUTHENTICATED_ACTIONS.includes(operationName);

    if (noAuthentication) {
      return context;
    }

    const authorization = ctx.request.header.authorization;
    if (!authorization) {
      throw new AuthenticationError('invalid token');
    }

    const sessionId = authorization.split(' ')[1];

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
  tracing: process.env.NODE_ENV !== 'production',
  introspection: true,
  playground: {
    settings: {
      'editor.reuseHeaders': true,
      'tracing.hideTracingResponse': true,
    },
  },
});
