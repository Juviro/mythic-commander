import { mergeResolvers } from 'merge-graphql-schemas';

import User from './User/';
import Collection from './Collection/';
import Session from './Session/';
import Deck from './Deck/';
import Search from './Search/';
import Card from './Card/';

const resolvers = [User, Collection, Session, Deck, Search, Card];

export default mergeResolvers(resolvers);
