import { populateCards } from '../../../cardApi';

const getCards = async (userId, query, limit, db) => {
  const { rows: cards } = await db.raw(
    `
      SELECT "distinctCards".*, collection."userId" 
      FROM "distinctCards" 
      LEFT OUTER JOIN collection 
        ON collection.oracle_id = "distinctCards".oracle_id 
        AND collection."userId" = ?
      WHERE name ILIKE ? 
      AND "userId" IS NULL
      LIMIT ?
    `,
    [userId, `%${query}%`, limit]
  );
  return cards;
};
const getDecks = async (userId, query, limit, db) => {
  const { rows: decks } = await db.raw(
    `
      SELECT *
      FROM decks
      WHERE name ILIKE ? 
      AND "userId" = ?
      LIMIT ?
    `,
    [`%${query}%`, userId, limit]
  );
  return decks;
};
const getCollection = async (userId, query, limit, db) => {
  const { rows: collection } = await db.raw(
    `
    SELECT *
    FROM collection
    LEFT JOIN cards ON cards.id = collection.id
    WHERE name ILIKE ? 
    AND "userId" = ?
    LIMIT ?
    `,
    [`%${query}%`, userId, limit]
  );
  return populateCards(collection);
};

export default {
  Query: {
    search: async (
      _,
      { query = '', limit = null },
      { db, user: { id: userId } }
    ) => {
      const cards = await getCards(userId, query, limit, db);
      const decks = await getDecks(userId, query, limit, db);
      const collection = await getCollection(userId, query, limit, db);

      return { cards, decks, collection };
    },
  },
};
