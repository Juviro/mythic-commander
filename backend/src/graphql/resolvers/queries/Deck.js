import unifyCardFormat from '../unifyCardFormat';

const resolver = {
  async cards({ id: deckId }, _, { db, user: { id: userId } }) {
    const { rows: cards } = await db.raw(
      `
      WITH "ownedOracleCards" AS (
        SELECT
        true as owned,
        oracle_id,
        row_number() OVER (PARTITION BY oracle_id) AS row_number
        FROM "collectionWithOracle"
        WHERE "userId"=?
        )
        select 
        CASE WHEN owned = TRUE THEN TRUE else FALSE END as owned, 
        "cardToDeckWithOracle".*, 
        cards.*  from "cardToDeckWithOracle" 
        LEFT JOIN "cards" 
          ON "cards"."id" = "cardToDeckWithOracle"."id" 
        LEFT JOIN "ownedOracleCards" 
          ON "ownedOracleCards"."oracle_id" = "cardToDeckWithOracle"."oracle_id" 
        WHERE  row_number = 1 AND "deckId" = ?;
        `,
      [userId, deckId]
    );

    return cards.map(unifyCardFormat(deckId));
  },
  async numberOfCards({ id: deckId }, _, { db }) {
    const [{ sum }] = await db('cardToDeck')
      .sum('amount')
      .where({ deckId });
    return sum || 0;
  },
  wantsLists({ id: deckId }, _, { db }) {
    return db('wantsLists')
      .where({ deckId })
      .orderBy('name');
  },
};

export default resolver;
