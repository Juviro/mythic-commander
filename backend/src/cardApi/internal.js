import db from '../database';

const sortByName = (a, b) => (a.name > b.name ? 1 : -1);
const sortById = (a, b) => (a.id > b.id ? 1 : -1);

export const addAdditionalProperties = ({ type_line, owned, ...rest }) => {
  const [mainTypes, flipTypes] = type_line.split(' // ');
  const [primaryTypes, subTypes] = mainTypes.split(' — ').map(part => part.split(' '));
  const showAsOwned = Boolean(owned || primaryTypes.includes('Basic'));

  return {
    type_line,
    primaryTypes,
    subTypes,
    flipTypes: flipTypes && flipTypes.split(' '),
    owned: showAsOwned,
    ...rest,
  };
};

// TODO try to deprecate this
export const populateCards = async cards => {
  const sortedCards = cards.sort(sortById);
  const ids = sortedCards.map(({ id }) => id);

  const rawCards = await db('cards')
    .whereIn('id', ids)
    .orderBy('id', 'ASC');

  const populatedCards = rawCards
    .map((card, index) => ({
      ...card,
      ...cards[index],
    }))
    .map(addAdditionalProperties);

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
