import unifyCardFormat from '../unifyCardFormat';

const resolver = {
  async cards({ id: deckId }, _, { db }) {
    const cards = await db('cardToDeck')
      .leftJoin('cards', { 'cards.id': 'cardToDeck.id' })
      .where({ deckId });

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
