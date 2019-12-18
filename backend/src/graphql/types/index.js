import { mergeTypes } from 'merge-graphql-schemas'

import User from './User/'
import Deck from './Deck/'
import Session from './Session/'
import Collection from './Collection/'

const typeDefs = [User, Deck, Session, Collection]

export default mergeTypes(typeDefs, { all: true })
