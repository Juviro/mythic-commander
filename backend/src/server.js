import { ApolloServer } from 'apollo-server-koa';

import schema from './graphql';
import db from './database';

const updateImg = async () => {
  const rows = await db("decks");
  const transformImgUrl = (url) => {
    const id = url.match(/\/([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})/)[1]
    return `https://mythic-commander.com/img/${id}_art_crop_front.avif`
}
  rows.forEach(async row => {
    await db("decks").where({ id: row.id }).update({ imgSrc: transformImgUrl(row.imgSrc) })
  })
}

updateImg();

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    const context = {
      db,
    };

    const authorization = ctx.request.header.authorization;
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
  formatError: error => {
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
