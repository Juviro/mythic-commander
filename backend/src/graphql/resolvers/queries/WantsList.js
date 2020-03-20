const resolver = {
  cards({ id: wantsListId }, _, { db }) {
    return db('cardToWantsList')
      .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
      .where({ wantsListId });
  },
  async numberOfCards({ id: wantsListId }, _, { db }) {
    const [{ sum }] = await db('cardToWantsList')
      .sum('amount')
      .where({ wantsListId });
    return sum || 0;
  },
};

export default resolver;
