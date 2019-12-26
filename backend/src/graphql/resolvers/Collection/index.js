import { getCardsByNameScryfall, populateCards } from '../../../cardApi/';

const ON_DUPLICATE =
  ' ON CONFLICT (id, "isFoil", set, "userId") DO UPDATE SET amount = collection.amount + 1, "createdAt" = NOW()';

export default {
  Query: {
    collection: async (_, _1, { user, db }) => {
      const collection = await db('collection').where({ userId: user.id });
      const populatedCards = await populateCards(collection);
      return populatedCards;
    },
  },
  Mutation: {
    addToCollectionById: async (_, { cards }, { user, db }) => {
      const withUserId = cards.map(card => ({ ...card, userId: user.id, amount: 1 }));
      if (!withUserId) return [];

      await db.raw(
        db('collection')
          .insert(withUserId)
          .toString() + ON_DUPLICATE
      );

      return populateCards(cards);
    },
    addToCollectionByName: async (_, { cards: cardNames }, { user, db }) => {
      const cards = await getCardsByNameScryfall(cardNames.map(({ name }) => name));
      const withoutDuplicates = cards.filter(({ id }, index) => index === cards.findIndex(card => card.id === id));
      const withUserId = withoutDuplicates.map(({ id, set }) => ({
        id,
        isFoil: false,
        set,
        userId: user.id,
        amount: 1,
      }));

      if (!withUserId) return [];

      await db.raw(
        db('collection')
          .insert(withUserId)
          .toString() + ON_DUPLICATE
      );

      return cards.map(card => ({ ...card, isFoil: false, userId: user.id, createdAt: new Date() }));
    },
    deleteFromCollection: async (_, { cardId }, { user, db }) => {
      await db('collection')
        .where({ id: cardId, userId: user.id })
        .del();
      return cardId;
    },
  },
};
