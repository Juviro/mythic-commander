const REFERENCE_SNAPSHOT_DAYS = 7;
const DEFAULT_COLLECTION_VISIBILITY = 'private';

export const getCurrentSnapshot = (db, userId) =>
  db('collectionWithOracle')
    .select(
      db.raw(`
        NOW() as date,
        CEIL(SUM(
          coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * amount + 
          coalesce(GREATEST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * "amountFoil"
        )) as "value",
        CEIL(SUM(
          coalesce(LEAST((prices->>'eur')::float, (prices->>'eur_foil')::float), 0) * amount + 
          coalesce(GREATEST((prices->>'eur')::float, (prices->>'eur_foil')::float), 0) * "amountFoil"
        )) as "valueEur",
        SUM(CASE WHEN prices->>'eur' IS NULL AND prices->>'eur_foil' IS NULL THEN 1 ELSE 0 END) AS "missingPriceEur",
        SUM(amount + "amountFoil") as amount,
        COUNT(*) as "amountUniqueVersions",
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
  currentSnapshot(_, __, { user: { id: userId }, db }) {
    if (!userId) return null;

    return getCurrentSnapshot(db, userId);
  },
  async visibility(_, __, { user: { id: userId }, db }) {
    const collectionVisibility = await db('collectionVisibility')
      .where({ userId })
      .first();

    return collectionVisibility
      ? collectionVisibility.visibility
      : DEFAULT_COLLECTION_VISIBILITY;
  },
};
