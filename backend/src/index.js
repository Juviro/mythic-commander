import Koa from 'koa';
import server from './server';
import './cron';

const app = new Koa();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
