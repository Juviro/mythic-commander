import '@babel/polyfill';
import Koa from 'koa';
import server from './server';
import './cron';

const app = new Koa();
const port = process.env.PORT || '4000';

server.applyMiddleware({ app, path: '/mtg-api/graphql' });
app.listen({ port }, () =>
  console.info(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
