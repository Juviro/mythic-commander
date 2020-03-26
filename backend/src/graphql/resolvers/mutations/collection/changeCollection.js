import unifyCardFormat from '../../unifyCardFormat';

const ON_DUPLICATE =
  ' ON CONFLICT (id, "userId") DO UPDATE SET amount = collection.amount + EXCLUDED.amount, "createdAt" = NOW()';

export default async (
  _,
  { cardOracleId, added = [], edited = [], deleted = [] },
  { user: { id: userId }, db }
) => {
  const promises = [];

  edited.forEach(({ id, amountOwned: amount, amountOwnedFoil: amountFoil }) => {
    const promise = db('collection')
      .update({ amount, amountFoil })
      .where({ id, userId });

    promises.push(promise);
  });

  added.forEach(({ id, amountOwned, amountOwnedFoil }) => {
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

  const updatedCard = await db('cards')
    .where({ oracle_id: cardOracleId })
    .first();

  return unifyCardFormat(userId)(updatedCard);
};
