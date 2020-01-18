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

export const getCards = async (selector, value) => {
  const query = db('cards')
    .whereIn(selector, value)
    .toString();
  const orderClause = ` ORDER BY oracle_id, (prices->>'eur')::float`;
  const { rows: cards } = await db.raw(query + orderClause);

  const filteredCards = cards.filter(
    (card, index) => !cards[index - 1] || card.oracle_id !== cards[index - 1].oracle_id
  );

  return filteredCards;
};

export const getCardsByName = async names => getCards('name', names);

export const getCardsById = async ids => getCards('id', ids);
