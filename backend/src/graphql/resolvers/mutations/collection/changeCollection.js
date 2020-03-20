const ON_DUPLICATE =
  ' ON CONFLICT (id, "userId") DO UPDATE SET amount = collection.amount + EXCLUDED.amount, "createdAt" = NOW()';

export default async (
  _,
  { cardOracleId, added = [], edited = [], deleted = [] },
  { user, db }
) => {
  const promises = [];

  edited.forEach(({ id, amount, amountFoil }) => {
    const promise = db('collection')
      .update({ amount, amountFoil })
      .where({ id, userId: user.id });

    promises.push(promise);
  });

  added.forEach(({ id, amount, amountFoil }) => {
    const promise = db.raw(
      `
        INSERT INTO collection 
          (id, "userId", amount, "amountFoil") 
        VALUES 
          (?, ?, ?, ?)
        ${ON_DUPLICATE};
    `,
      [id, user.id, amount, amountFoil]
    );

    promises.push(promise);
  });

  if (deleted.length) {
    const promise = db('collection')
      .where({ userId: user.id })
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

  return db('cards')
    .where({ oracle_id: cardOracleId })
    .first();
};
