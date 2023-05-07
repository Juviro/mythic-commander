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
        count(*) as "uniqueCardsOwned" 
      FROM (
      	SELECT 
	        set,
	        oracle_id
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

  return sets.map(({ uniqueCardsOwned, ...set }) => ({
    ...set,
    uniqueCardsOwned: uniqueCardsOwned || 0,
    totalCardsOwned: 0,
  }));
};

export default collectionBySet;
