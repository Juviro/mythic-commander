import { toDeckCard } from './Card/helper';

const resolver = {
  async cards({ id: deckId }, _, { db }) {
    const cards = await db('cardToDeck')
      .leftJoin('cards', { 'cards.id': 'cardToDeck.id' })
      .where({ deckId });
    return cards.map(toDeckCard);
  },
};

export default resolver;
