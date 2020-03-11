const ON_CONFLICT = `
ON CONFLICT (id, "userId") 
DO UPDATE SET 
  amount = collection.amount + EXCLUDED.amount, 
  "createdAt" = NOW()
  `;

export default async (_, { cards }, { user: { id: userId }, db }) => {
  const withoutDuplicates = cards
    .filter(
      ({ id }, index) => index === cards.findIndex(card => card.id === id)
    )
    .map(card => ({ ...card, userId }));
  const query = db('collection')
    .insert(withoutDuplicates)
    .toString();
  const { rows: newCardIds } = await db.raw(
    query + ON_CONFLICT + ' returning id'
  );
  const newCards = await db('collection')
    .leftJoin('cards', { 'cards.id': 'collection.id' })
    .whereIn(
      'collection.id',
      newCardIds.map(({ id }) => id)
    )
    .andWhere({ userId });
  console.log('newCards :', newCards);

  return {
    id: userId,
    cards: newCards,
  };
};
