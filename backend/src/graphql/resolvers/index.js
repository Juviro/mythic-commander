import { mergeResolvers } from 'merge-graphql-schemas'

import User from './User/'
import Collection from './Collection/'
import Session from './Session/'

const resolvers = [User, Collection, Session]

export default mergeResolvers(resolvers)
