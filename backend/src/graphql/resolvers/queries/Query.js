import getCachedCards from './getCachedCards';
import cardSearch, { addNameClause } from './cardSearch';
import proxies from './proxies';
import unifyCardFormat from '../unifyCardFormat';
import paginatedCollection from './paginatedCollection';
import { getCurrentSnapshot } from './Collection';
import { isCollectionPublic } from '../../../auth/authenticateUser';
import wantedCards from './wantedCards';

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

  async ownedCardNames(_, __, { db, user: { id: userId } }) {
    const cardNames = await db('collection')
      .leftJoin('cards', { 'cards.id': 'collection.id' })
      .distinct('name')
      .where({ userId });
    return cardNames.map(({ name }) => name);
  },
  wantedCards(_, { username }, { db, user: { id: userId } }) {
    return wantedCards(db, username, userId);
  },
  async paginatedCollection(
    _,
    { limit, offset, orderBy, search, username },
    { db, user: { id: userId } }
  ) {
    let collectionUserId = userId;

    if (username) {
      const { id } = await db('users')
        .where('username', 'ILIKE', username)
        .select('id')
        .first();
      collectionUserId = id;
      await isCollectionPublic(collectionUserId);
    }

    const cards = await paginatedCollection(
      db,
      collectionUserId,
      limit,
      offset,
      orderBy,
      search,
      !username
    );
    const amountUnique = cards.length ? cards[0].amountUnique : 0;
    const hasMore = amountUnique > limit + offset;

    return {
      hasMore,
      search,
      totalResults: amountUnique,
      cards: cards.map(unifyCardFormat(collectionUserId)),
      nextOffset: hasMore ? offset + limit : null,
    };
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
  async collectionSnapshots(_, __, { user: { id: userId }, db }) {
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
