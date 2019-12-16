import { mergeTypes } from 'merge-graphql-schemas'

import User from './User/'
import Session from './Session/'
import Collection from './Collection/'

const typeDefs = [User, Session, Collection]

export default mergeTypes(typeDefs, { all: true })
