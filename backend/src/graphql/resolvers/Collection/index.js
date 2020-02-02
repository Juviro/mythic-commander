import {
  populateCards,
  populateCardsByName,
  populateCardsById,
} from '../../../cardApi/';

const ON_DUPLICATE =
  ' ON CONFLICT (id, "isFoil", set, "userId") DO UPDATE SET amount = collection.amount + EXCLUDED.amount, "createdAt" = NOW()';

const addToCollection = async (cards, userId, db) => {
  const withoutDuplicates = cards.filter(
    ({ id }, index) => index === cards.findIndex(card => card.id === id)
  );
  const withUserId = withoutDuplicates.map(({ id, set, amount = 1 }) => ({
    id,
    isFoil: false,
    set,
    userId,
    amount,
  }));

  if (!withUserId.length) return;

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
    addToCollectionById: async (_, { cards }, { user, db }) => {
      const populatedCards = await populateCardsById(cards);
      await addToCollection(populatedCards, user.id, db);

      return getCollection(user.id, db);
    },
    addToCollectionByName: async (_, { cards }, { user, db }) => {
      const populatedCards = await populateCardsByName(cards);
      await addToCollection(populatedCards, user.id, db);

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
