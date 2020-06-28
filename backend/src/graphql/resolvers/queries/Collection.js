import unifyCardFormat from '../unifyCardFormat';

const REFERENCE_SNAPSHOT_DAYS = 7;

export const getCurrentSnapshot = (db, userId) =>
  db('collectionWithOracle')
    .select(
      db.raw(`
        NOW() as date,
        CEIL(SUM(
          coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * amount + 
          coalesce(GREATEST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * "amountFoil"
        )) as "value",
        SUM(amount + "amountFoil") as amount,
        COUNT(DISTINCT cards.oracle_id) as "amountUnique"
      `)
    )
    .leftJoin('cards', { 'cards.id': 'collectionWithOracle.id' })
    .where({ userId })
    .first();

export default {
  async referenceSnapshot(_, __, { db, user: { id: userId } }) {
    const snapshots = await db('collectionSnapshot')
      .where({ userId })
      .orderBy('date', 'desc')
      .limit(REFERENCE_SNAPSHOT_DAYS);

    return snapshots[snapshots.length - 1];
  },
  async currentSnapshot(_, __, { user: { id: userId }, db }) {
    return getCurrentSnapshot(db, userId);
  },
  async cards(_, __, { db, user: { id: userId } }) {
    const query = db
      .with(
        'grouped',
        db.raw(
          `
          SELECT
            true as owned, 
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
        `,
          userId
        )
      )
      .select('*')
      .from('grouped')
      .leftJoin('cards', { 'cards.id': 'grouped.id' })
      .orderBy('createdAt', 'DESC');

    const cards = await query;

    return cards.map(unifyCardFormat(userId));
  },
};
