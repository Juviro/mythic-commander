import { mergeResolvers } from 'merge-graphql-schemas'

import User from './User/'
import Collection from './Collection/'

const resolvers = [User, Collection]

export default mergeResolvers(resolvers)
