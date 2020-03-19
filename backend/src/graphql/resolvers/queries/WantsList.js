const resolver = {
  cards({ id: wantsListId }, _, { db }) {
    return db('cardToWantsList')
      .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
      .where({ wantsListId });
  },
  async numberOfCards({ id: wantsListId }, _, { db }) {
    const [{ count }] = await db('cardToWantsList')
      .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
      .count('cards')
      .where({ wantsListId });
    return count;
  },
};

export default resolver;
