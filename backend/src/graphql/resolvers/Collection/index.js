import { populateCards, getCardsByName, getCardsById } from '../../../cardApi/';

const ON_DUPLICATE =
  ' ON CONFLICT (id, "isFoil", set, "userId") DO UPDATE SET amount = collection.amount + 1, "createdAt" = NOW()';

const addToCollection = async (cards, userId, db) => {
  const withoutDuplicates = cards.filter(({ id }, index) => index === cards.findIndex(card => card.id === id));
  const withUserId = withoutDuplicates.map(({ id, set }) => ({
    id,
    isFoil: false,
    set,
    userId,
    amount: 1,
  }));

  if (!withUserId) return [];

  await db.raw(
    db('collection')
      .insert(withUserId)
      .toString() + ON_DUPLICATE
  );
};

const getCollection = async (userId, db) => {
  const collection = await db('collection').where({ userId });
  const cards = await populateCards(collection);

  return { id: userId, cards };
};

export default {
  Query: {
    collection: async (_, _1, { user, db }) => getCollection(user.id, db),
  },
  Mutation: {
    addToCollectionById: async (_, { cards: cardIds }, { user, db }) => {
      const cards = await getCardsById(cardIds.map(({ id }) => id));
      await addToCollection(cards, user.id, db);

      return getCollection(user.id, db);
    },
    addToCollectionByName: async (_, { cards: cardNames }, { user, db }) => {
      const cards = await getCardsByName(cardNames.map(({ name }) => name));
      await addToCollection(cards, user.id, db);

      return getCollection(user.id, db);
    },
    deleteFromCollection: async (_, { cardIds }, { user, db }) => {
      await db('collection')
        .whereIn('id', cardIds)
        .andWhere({ userId: user.id })
        .del();

      return getCollection(user.id, db);
    },
  },
};
