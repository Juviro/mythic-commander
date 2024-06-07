import { ApolloServer } from 'apollo-server-koa';

import schema from './graphql';
import db from './database';

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    const context = {
      db,
    };

    const { authorization } = ctx.request.header;
    if (!authorization) {
      return { ...context, user: {} };
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

    if (user) {
      await db('users')
        .update({ lastOnline: new Date() })
        .where({ id: user.id });
    }

    return { ...context, user: user ?? {} };
  },
  formatError: (error) => {
    console.error('error', error);
    return error;
  },
  tracing: true,
  introspection: true,
  playground: {
    settings: {
      'editor.reuseHeaders': true,
      'tracing.hideTracingResponse': true,
    },
  },
});
