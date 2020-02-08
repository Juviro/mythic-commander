import { getAllCardNames, getAllSets } from '../../network/mtgApi';
import client from '../../network/graphqlClient';
import { cachedCards } from '../../queries/cards';

const REFRESH_PERIOD = 24 * 60 * 60 * 1000;

// Special cases for the three cards named
// "Our Market Research Shows That Players Like Really Long bla bla bla"
// and
// "The Ultimate Nightmare of Wizards of the Coast® Customer Service"
// and
// "Curse of the Fire Penguin // Curse of the Fire Penguin Creature"
// that kind of break the search
// and the card "_____"
// that can't be found by the scryfall api
const filterProblematicCards = ({ n }) => {
  const tooLong = n.length > 60;
  const crashesDb = n.startsWith('___');

  return !tooLong && !crashesDb;
};

const getCards = async () => {
  const { data } = await client.query({ query: cachedCards });
  return data.cachedCards.filter(filterProblematicCards) || [];
};

const getSets = async () => {
  const sets = await getAllSets();
  return sets;
};

export const getCollectionFromCache = async type => {
  const lastUpdateKey = `lastUpdate-${type}`;
  const collectionKey = `collection-${type}`;

  const lastUpdate = localStorage.getItem(lastUpdateKey);
  const shouldUpdate = !lastUpdate || Date.now() - lastUpdate > REFRESH_PERIOD;
  const cachedCollection = localStorage.getItem(collectionKey);

  if (!shouldUpdate && cachedCollection) {
    return JSON.parse(cachedCollection);
  }

  const deleteMe = {
    sets: getSets,
    cards: getCards,
  };

  const getCollection = deleteMe[type];

  const collection = await getCollection();

  localStorage.setItem(collectionKey, JSON.stringify(collection));
  localStorage.setItem(lastUpdateKey, Date.now());

  return collection;
};
