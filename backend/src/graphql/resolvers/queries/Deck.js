import unifyCardFormat from '../unifyCardFormat';

const resolver = {
  canEdit({ userId }, _, { user }) {
    return userId === user.id;
  },
  async cards({ id: deckId }, _, { db, user: { id: userId } }) {
    const { rows: cards } = await db.raw(
      `
      WITH "ownedOracleCards" AS (
          SELECT
            TRUE as owned,
            oracle_id, 
            row_number() OVER (PARTITION BY oracle_id) AS row_number
          FROM "collectionWithOracle"
          WHERE "userId"=?
        )
      SELECT 
        CASE WHEN owned = TRUE then TRUE else FALSE END as owned,
        CASE WHEN "defaultCardVersions".id IS NULL then FALSE else TRUE END as "isDefault",
        "cardToDeckWithOracle".*, 
        cards.*  
      FROM "cardToDeckWithOracle" 
      LEFT JOIN "cards" 
        ON "cards"."id" = "cardToDeckWithOracle"."id" 
      LEFT JOIN "ownedOracleCards" 
        ON "ownedOracleCards"."oracle_id" = "cardToDeckWithOracle"."oracle_id"
      LEFT JOIN "defaultCardVersions" 
        ON "userId"=? AND "defaultCardVersions".id = cards.id
      WHERE "deckId" = ?
      AND (row_number = 1 OR row_number IS NULL);
        `,
      [userId ?? '', userId ?? '', deckId]
    );

    return cards.map(unifyCardFormat(deckId));
  },
  async numberOfCards({ id: deckId }, _, { db }) {
    const [{ sum }] = await db('cardToDeck').sum('amount').where({ deckId });
    return sum || 0;
  },
  wantsLists({ id: deckId }, _, { db }) {
    return db('wantsLists').where({ deckId }).orderBy('name');
  },
  async colors({ id: deckId }, _, { db }) {
    const result = await db('deckColors')
      .select('colors')
      .where({ deckId })
      .first();

    return result?.colors ?? null;
  },
};

export default resolver;
