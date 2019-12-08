import { mergeTypes } from 'merge-graphql-schemas'

import User from './User/'
import Collection from './Collection/'

const typeDefs = [User, Collection]

export default mergeTypes(typeDefs, { all: true })
