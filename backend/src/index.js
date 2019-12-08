import Koa from 'koa'
import { ApolloServer, gql } from 'apollo-server-koa'
import server from './server'

const app = new Koa()
server.applyMiddleware({ app })
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
