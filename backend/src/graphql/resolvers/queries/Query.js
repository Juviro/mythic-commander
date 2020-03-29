import getCachedCards from './getCachedCards';
import cardSearch from './cardSearch';

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
  cardByOracleId(_, { oracle_id }, { db }) {
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
    return db('decks')
      .where({ userId: user.id })
      .orderBy('lastEdit', 'desc');
  },

  collection(_, __, { user: { id } }) {
    return { id };
  },

  cachedCards: (_, __, { db }) => getCachedCards(db),
  numberOfCachedCards: async (_, __, { db }) => {
    const { count } = await db('distinctCards')
      .count('*')
      .first();
    return count;
  },

  cardSearch,

  wantsList(_, { id }, { user: { id: userId }, db }) {
    return db('wantsLists')
      .where({ id, userId })
      .first();
  },

  wantsLists(_, __, { user: { id: userId }, db }) {
    return db('wantsLists')
      .where({ userId })
      .orderBy('createdAt', 'asc');
  },
};

export default resolver;
