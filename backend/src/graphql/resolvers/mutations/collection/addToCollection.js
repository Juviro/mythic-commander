import unifyCardFormat from '../../unifyCardFormat';

const ON_CONFLICT = `
    ON CONFLICT (id, "userId") 
    DO UPDATE SET 
      amount = collection.amount + EXCLUDED.amount, 
      "amountFoil" = collection."amountFoil" + EXCLUDED."amountFoil", 
      "createdAt" = NOW()
  `;

export default async (_, { cards }, { user: { id: userId }, db }) => {
  const withoutDuplicates = cards
    .filter(
      ({ id }, index) => index === cards.findIndex((card) => card.id === id)
    )
    .map((card) => ({ ...card, userId }));

  const withFoil = withoutDuplicates.map(({ amount, isFoil, ...rest }) => {
    if (!isFoil)
      return {
        amount,
        ...rest,
      };
    return {
      amountFoil: amount,
      ...rest,
    };
  });

  const query = db('collection').insert(withFoil).toString();

  const { rows: newCardIds } = await db.raw(
    `${query + ON_CONFLICT} returning id`
  );
  const updatedCards = await db('collection')
    .leftJoin('cards', { 'cards.id': 'collection.id' })
    .whereIn(
      'collection.id',
      newCardIds.map(({ id }) => id)
    )
    .andWhere({ userId });

  return updatedCards.map(unifyCardFormat(userId));
};
