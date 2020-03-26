import db from '../../../database';
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
};

resolver.cards({ id: 44 }, null, { db });
export default resolver;
