import { getCachedCards } from './helper';

const resolver = {
  user(_, __, { db, user: { id } }) {
    return db('users')
      .where({ id })
      .first();
  },

  card(_, { id }, { db }) {
    return db('cards')
      .where({ id })
      .first();
  },
  cardsByOracleId(_, { oracle_id }, { db }) {
    return db('distinctCards')
      .where({ oracle_id })
      .first();
  },

  deck(_, { id }, { user, db }) {
    return db('decks')
      .where({ userId: user.id, id })
      .first();
  },
  decks(_, __, { user, db }) {
    return db('decks').where({ userId: user.id });
  },

  collection(_, __, { user: { id } }) {
    return { id };
  },

  cachedCards: (_, __, { db }) => getCachedCards(db),
};

export default resolver;
