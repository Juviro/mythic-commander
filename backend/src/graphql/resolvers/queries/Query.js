import getCachedCards from './getCachedCards';
import cardSearch from './cardSearch';
import proxies from './proxies';

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
  async cardByOracleId(_, { oracle_id }, { db }) {
    const card = await db('distinctCards')
      .where({ oracle_id })
      .first();
    if (card) return card;

    return db('cards')
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

  wantsLists(_, { deckId }, { user: { id: userId }, db }) {
    const where = { userId };
    if (deckId) where.deckId = deckId;

    return db('wantsLists')
      .where(where)
      .orderBy('createdAt', 'asc');
  },
  collectionSnapshots(_, __, { user: { id: userId }, db }) {
    return db('collectionSnapshot')
      .where({ userId })
      .orderBy('date');
  },

  proxies(_, { type, id, filter }, { user: { id: userId } }) {
    return proxies({ type, id, filter }, userId);
  },

  async allLists(_, __, { user: { id: userId }, db }) {
    const wantsLists = await db('wantsLists')
      .where({ userId })
      .orderBy('deckId', 'asc')
      .orderBy('name', 'asc');

    const decks = db('decks')
      .where({ userId })
      .orderBy('name', 'asc');

    return {
      decks,
      wantsLists,
    };
  },
};

export default resolver;
