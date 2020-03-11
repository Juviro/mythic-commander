const resolver = {
  cards(_, __, { db, user: { id: userId } }) {
    return db('collection')
      .leftJoin('cards', { 'cards.id': 'collection.id' })
      .where({ userId });
  },
};

export default resolver;
