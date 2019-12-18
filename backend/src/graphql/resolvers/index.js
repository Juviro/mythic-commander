import { mergeResolvers } from 'merge-graphql-schemas'

import User from './User/'
import Collection from './Collection/'
import Session from './Session/'
import Deck from './Deck/'

const resolvers = [User, Collection, Session, Deck]

export default mergeResolvers(resolvers)
