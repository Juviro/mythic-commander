import { toDeckCard } from './Card/helper';

const resolver = {
  async cards({ id: deckId }, _, { db }) {
    const cards = await db('cardToDeck')
      .leftJoin('cards', { 'cards.id': 'cardToDeck.id' })
      .where({ deckId });

    return cards.map(toDeckCard);
  },
  async numberOfCards({ id: deckId }, _, { db }) {
    const [{ count }] = await db('cardToDeck')
      .leftJoin('cards', { 'cards.id': 'cardToDeck.id' })
      .count('cards')
      .where({ deckId });
    return count;
  },
};

export default resolver;
