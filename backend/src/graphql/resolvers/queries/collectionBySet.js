const collectionBySet = async (_, __, { user, db }) => {
  if (!user.id) {
    return null;
  }

  // const sets = await db('sets');
  const { rows: sets } = await db.raw(
    `
    WITH "cardsPerSet" AS (
      SELECT 
        set,
        count(*) as "uniqueCardsOwned",
        sum("uniqueVersionsOwned") as "uniqueVersionsOwned",
        sum("totalCardsOwned") as "totalCardsOwned"
      FROM (
      	SELECT 
	        set,
	        oracle_id,
          count(*) as "uniqueVersionsOwned",
          sum(amount + "amountFoil") as "totalCardsOwned"
	      FROM collection 
	      LEFT JOIN cards 
	        ON collection.id = cards.id 
	      WHERE "userId" = ?
	      GROUP BY set, oracle_id
	      ORDER BY set
      ) uniqueOracleIds
      GROUP BY set
    )
      SELECT * FROM sets
      LEFT JOIN "cardsPerSet"
        ON sets.code = "cardsPerSet".set
      ORDER BY released_at DESC
  `,
    [user.id]
  );

  return sets.map(
    ({ uniqueCardsOwned, uniqueVersionsOwned, totalCardsOwned, ...set }) => ({
      ...set,
      uniqueCardsOwned: uniqueCardsOwned || 0,
      uniqueVersionsOwned: uniqueVersionsOwned || 0,
      totalCardsOwned: totalCardsOwned || 0,
    })
  );
};

export default collectionBySet;
