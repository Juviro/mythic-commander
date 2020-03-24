import db from '../database';

const updateCollectionValue = async () => {
  const users = await db('users').select('id');
  const userIds = users.map(({ id }) => id);

  for (const userId of userIds) {
    const {
      rows: [{ value }],
    } = await db.raw(
      `
      SELECT SUM(
        coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * amount + 
        coalesce(GREATEST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * "amountFoil"
        )::int as value 
      FROM collection 
      LEFT JOIN cards 
        ON cards.id = collection.id
      WHERE "userId"=?;
    `,
      [userId]
    );
    if (!value) continue;

    await db('collectionValue').insert({ value, userId });

    await db.raw(
      `
      INSERT INTO "collectionAmount" (
        SELECT 
          "userId", 
          SUM(amount + "amountFoil") as amount,
          count(*) as "amountUnique" 
        FROM collection 
        LEFT JOIN cards 
          ON cards.id = collection.id 
        WHERE "userId" = ?
        GROUP BY "userId"
      )
      `,
      [userId]
    );
  }
};

export default updateCollectionValue;
