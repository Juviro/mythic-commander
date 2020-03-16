const resolver = {
  async cards(_, __, { db, user: { id: userId } }) {
    const { rows: cards } = await db.raw(
      `
        WITH grouped AS (
          SELECT 
            SUM(amount) as amount, 
            SUM("amountFoil") as "amountFoil", 
            MAX("createdAt") as "createdAt",
            MAX(cards.id) as id 
          FROM collection 
          LEFT JOIN cards 
            ON cards.id = collection.id 
          WHERE "userId" = ?
          GROUP BY cards.oracle_id
        )
        SELECT * 
        FROM grouped 
        LEFT JOIN cards 
          ON cards.id = grouped.id
        WHERE amount > 0 OR "amountFoil" > 0
        ORDER BY "createdAt";
    `,
      [userId]
    );

    return cards;
  },
};

export default resolver;
