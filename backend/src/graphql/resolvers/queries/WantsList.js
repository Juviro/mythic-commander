const resolver = {
  async cards({ id: wantsListId }, _, { db }) {
    return db('cardToWantsList')
      .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
      .where({ wantsListId });
  },
};

export default resolver;
