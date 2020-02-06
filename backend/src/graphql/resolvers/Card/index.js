export default {
  Query: {
    card: async (_, { id }, { db }) => {
      const [card] = await db('cards').where({ id });
      return card;
    },
    getCardByName: async (_, { name }, { db }) => {
      const [card] = await db('cards').where({ name });
      return card;
    },
    searchCard: async (_, { query, limit = null }, { db }) => {
      if (!query) return [];
      const {
        rows: cards,
      } = await db.raw(
        `SELECT * FROM "distinctCards" WHERE name ILIKE ? LIMIT ? `,
        [`%${query}%`, limit]
      );
      return cards;
    },
    cards: (_, _1, { db }) => db('cards'),
  },
};
