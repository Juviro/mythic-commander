const collectionBySet = async (_, __, { user, db }) => {
  const sets = await db('sets');

  return sets.map((set) => ({
    ...set,
    totalCardsOwned: Math.floor(set.card_count * 1.5),
    uniqueCardsOwned: Math.floor(set.card_count / 3),
  }));
};

export default collectionBySet;
