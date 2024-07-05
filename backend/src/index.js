import '@babel/polyfill';
import Koa from 'koa';
import session from 'koa-session';
import server from './server';
import './cron';
import logger from './logging/logger';
import './logging/logger-dashboard';

const app = new Koa();
const port = process.env.PORT || '4000';

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/mtg-api/graphql' });
  app.use(session({ sameSite: 'Strict' }, app));
  app.listen({ port }, () =>
    logger.info(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
};

startServer();
