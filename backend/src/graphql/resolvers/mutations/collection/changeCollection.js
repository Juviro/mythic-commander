import unifyCardFormat from '../../unifyCardFormat';

const ON_DUPLICATE =
  ' ON CONFLICT (id, "userId") DO UPDATE SET amount = collection.amount + EXCLUDED.amount, "createdAt" = NOW()';

// TODO: remove cardOracleId
export default async (
  _,
  { cardOracleId, added = [], edited = [], deleted = [], cardId },
  { user: { id: userId }, db }
) => {
  const promises = [];

  edited.forEach(({ id, amountOwned: amount, amountOwnedFoil: amountFoil }) => {
    const promise = db('collection')
      .update({ amount, amountFoil })
      .where({ id, userId });

    promises.push(promise);
  });

  added.forEach(({ id, amountOwned = 0, amountOwnedFoil = 0 }) => {
    const promise = db.raw(
      `
        INSERT INTO collection 
          (id, "userId", amount, "amountFoil") 
        VALUES 
          (?, ?, ?, ?)
        ${ON_DUPLICATE};
    `,
      [id, userId, amountOwned, amountOwnedFoil]
    );

    promises.push(promise);
  });

  if (deleted.length) {
    const promise = db('collection')
      .where({ userId })
      .andWhereIn('id', deleted)
      .del();
    promises.push(promise);
  }

  await Promise.all(promises);

  if (edited.length) {
    await db('collection')
      .where({ amount: 0, amountFoil: 0 })
      .del();
  }

  const updatedCards = await db('collection')
    .leftJoin('cards', { 'cards.id': 'collection.id' })
    .where({ oracle_id: cardOracleId })
    .andWhere({ userId });

  return updatedCards.map(unifyCardFormat(userId))[0];
};
