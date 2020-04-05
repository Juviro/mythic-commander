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

  async wantsList(_, { id }, { user: { id: userId }, db }) {
    const {
      rows: [wantsList],
    } = await db.raw(
      `
        SELECT "wantsLists".*, row_to_json(decks) as deck
        FROM "wantsLists" 
        LEFT JOIN decks 
          ON decks.id = "wantsLists"."deckId" 
        WHERE "wantsLists".id = ?
          AND "wantsLists"."userId" = ?;
    `,
      [id, userId]
    );

    return wantsList;
  },

  async wantsLists(_, __, { user: { id: userId }, db }) {
    const { rows: wantsLists } = await db.raw(
      `
        SELECT "wantsLists".*, row_to_json(decks) as deck
        FROM "wantsLists" 
        LEFT JOIN decks 
          ON decks.id = "wantsLists"."deckId" 
        WHERE "wantsLists"."userId" = ?;
    `,
      [userId]
    );

    return wantsLists;
  },
  collectionDevelopment(_, __, { user: { id: userId }, db }) {
    return db('collectionSnapshot')
      .where({ userId })
      .orderBy('date');
  },
};

export default resolver;
