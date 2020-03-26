const resolver = {
  async cards({ id: wantsListId }, _, { db }) {
    const { rows: cards } = await db.raw(
      `
        SELECT "cardToWantsList".*, row_to_json(cards) as card 
        FROM "cardToWantsList" 
        LEFT JOIN cards 
          ON cards.id = "cardToWantsList".id 
        WHERE "wantsListId" = ?;
    `,
      [wantsListId]
    );

    return cards;
  },
  async numberOfCards({ id: wantsListId }, _, { db }) {
    const [{ sum }] = await db('cardToWantsList')
      .sum('amount')
      .where({ wantsListId });
    return sum || 0;
  },
};

export default resolver;
