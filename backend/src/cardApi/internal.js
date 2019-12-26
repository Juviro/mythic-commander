import db from '../database';

const sortByName = (a, b) => (a.name > b.name ? 1 : -1);
const sortById = (a, b) => (a.id > b.id ? 1 : -1);

export const populateCards = async cards => {
  const sortedCards = cards.sort(sortById);
  const ids = sortedCards.map(({ id }) => id);

  const rawCards = await db('cards')
    .whereIn('id', ids)
    .orderBy('id', 'ASC');

  const populatedCards = rawCards.map((card, index) => ({
    ...card,
    ...cards[index],
  }));

  return populatedCards.sort(sortByName);
};

// finds for each cardname in *names* the latest card
export const getCardsByName = async names => {
  const cards = await db('cards')
    .whereIn('name', names)
    .orderBy('oracle_id');
  const filteredCards = cards.filter(
    (card, index) => !cards[index + 1] || card.oracle_id !== cards[index + 1].oracle_id
  );
  return filteredCards;
};
