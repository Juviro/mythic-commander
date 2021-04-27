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

    return cards.map(({ id, ...rest }) => ({
      id: `wants-${wantsListId}-${id}`,
      ...rest,
    }));
  },
  async numberOfCards({ id: wantsListId }, _, { db }) {
    const [{ sum }] = await db('cardToWantsList')
      .sum('amount')
      .where({ wantsListId });
    return sum || 0;
  },
  deck({ deckId, deck }, _, { user: { id: userId = '' }, db }) {
    if (deck) return deck;
    if (!deckId) return null;

    return db('decks')
      .where({ id: deckId })
      .andWhere({ userId })
      .orWhereNot('visibility', 'private')
      .first();
  },
  canEdit({ userId }, _, { user }) {
    return userId === user.id;
  },
};

export default resolver;
