// TODO: maybe refactor this. Find id in frontend instead
export default async (_, { cards }, { user: { id: userId }, db }) => {
  const withoutDuplicates = cards.filter(
    ({ name }, index) => index === cards.findIndex(card => card.name === name)
  );
  const { rows: newCardIds } = await db.raw(
    `
  INSERT INTO collection (id, "userId", amount) 
  VALUES ${withoutDuplicates.map(
    () => `
  (
    (
      SELECT id 
      FROM "distinctCards" 
      WHERE name = ?
    ), 
    ?, ?
  )
  `
  )}
    ON CONFLICT (id, "userId") 
      DO UPDATE SET 
        amount = collection.amount + EXCLUDED.amount, 
        "createdAt" = NOW()
    RETURNING id;
    `,
    withoutDuplicates.map(({ name, amount }) => [name, userId, amount]).flat()
  );

  return db('collection')
    .leftJoin('cards', { 'cards.id': 'collection.id' })
    .whereIn(
      'collection.id',
      newCardIds.map(({ id }) => id)
    )
    .andWhere({ userId });
};
