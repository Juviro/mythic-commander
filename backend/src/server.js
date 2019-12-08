import { ApolloServer, AuthenticationError } from 'apollo-server-koa'

import schema from './graphql'
import db from './database'
import { validateToken } from './auth'
import { UNAUTHORIZED } from 'http-status-codes'

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    const header = ctx.request.header

    let user
    try {
      user = await validateToken(header.authorization.split(' ')[1])
    } catch {
      throw new AuthenticationError('invalid token')
    }

    return { ...ctx, db, user }
  },
  formatError: error => {
    console.error('error', error)
    return error
  },
  playground: 'api/graphql',
})
