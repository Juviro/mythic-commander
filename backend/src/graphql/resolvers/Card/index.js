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
    cards: (_, _1, { db }) => db('cards'),
  },
};
