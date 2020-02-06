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
    search: async (_, { query }, { db }) => {
      const cards = db('cards').where({ name: query });
      return cards;
    },
    cards: (_, _1, { db }) => db('cards'),
  },
};
