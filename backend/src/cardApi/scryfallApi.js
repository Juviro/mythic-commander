import { Cards, CardIdentifier } from 'scryfall-sdk';

const sortByName = (a, b) => (a.name > b.name ? 1 : -1);

const getCollection = async (collection, identifier) => {
  const start = Date.now();
  if (!collection.length) return [];

  const cardCollection = collection.map(id => identifier(id));
  const cards = await Cards.collection(...cardCollection).waitForAll();
  console.info('########## fetchig cards took', (Date.now() - start) / 1000, 's');
  return cards;
};

export const getCardsById = async ids => getCollection(ids, CardIdentifier.byId);

export const getCardsByName = async names => getCollection(names, CardIdentifier.byName);

export const populateCards = async (cards, sort) => {
  const ids = cards.map(({ id }) => id);

  const rawCards = await getCardsById(ids);
  const populatedCards = rawCards.map((card, index) => ({
    ...card,
    ...cards[index],
  }));

  return populatedCards.sort(sort || sortByName);
};
