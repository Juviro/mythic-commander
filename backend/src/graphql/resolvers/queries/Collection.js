import unifyCardFormat from '../unifyCardFormat';

const REFERENCE_SNAPSHOT_DAYS = 7;

export default {
  async snapshot(_, __, { db, user: { id: userId } }) {
    const snapshots = await db('collectionSnapshot')
      .where({ userId })
      .orderBy('date', 'desc')
      .limit(REFERENCE_SNAPSHOT_DAYS);

    return snapshots[snapshots.length - 1];
  },
  async cards(_, __, { db, user: { id: userId } }) {
    const { rows: cards } = await db.raw(
      `
        WITH grouped AS (
          SELECT 
            SUM(amount) as "amountOwned", 
            SUM("amountFoil") as "amountOwnedFoil", 
            SUM("amountFoil" + amount) as "totalAmount", 
            MAX("createdAt") as "createdAt",
            SUM(
              coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * amount + 
              coalesce(GREATEST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * "amountFoil"
            ) as "sumPrice",
            MIN(coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0)) as "minPrice",
            MAX(cards.id) as id 
          FROM collection 
          LEFT JOIN cards 
            ON cards.id = collection.id 
          WHERE "userId" = ?
          AND (
            amount > 0 OR "amountFoil" > 0
          )
          GROUP BY cards.oracle_id
        )
        SELECT *, true as owned 
        FROM grouped 
        LEFT JOIN cards 
          ON cards.id = grouped.id
        ORDER BY "createdAt" DESC; 
    `,
      [userId]
    );

    return cards.map(unifyCardFormat(userId));
  },
};
