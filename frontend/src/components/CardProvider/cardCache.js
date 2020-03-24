import { message } from 'antd';
import { getAllSets, getAllCreatureTypes } from '../../network/mtgApi';
import client from '../../network/graphqlClient';
import { cachedCards, numberOfCachedCards } from './queries';

const REFRESH_PERIOD = 24 * 60 * 60 * 1000;

const filteredCardOracleIds = [
  '94a3b2af-0741-48c5-b827-6ff529bafae3',
  '9adc9df1-bab0-4458-9453-7028f23693b8',
  '8d8b9933-d7a2-4adc-85ee-ac62b23e784f',
  '4e536142-4ebe-4062-887b-5dd123c41d39',
];
// Special cases for the three cards named
// "Our Market Research Shows That Players Like Really Long bla bla bla"
// and
// "The Ultimate Nightmare of Wizards of the Coast® Customer Service"
// and
// "Curse of the Fire Penguin // Curse of the Fire Penguin Creature"
// that kind of break the search
// and the card "_____"
// that can't be found by the scryfall api
const filterProblematicCards = ({ o }) => {
  return !filteredCardOracleIds.includes(o);
};

const getCards = async (currentCards = [], shouldForceUpdate) => {
  const {
    data: { numberOfCachedCards: updatedCardCount },
  } = await client.query({
    query: numberOfCachedCards,
  });

  const filteredUpdatedCardCount =
    updatedCardCount - filteredCardOracleIds.length;

  if (filteredUpdatedCardCount === currentCards.length && !shouldForceUpdate) {
    return currentCards;
  }

  message.info('Updating cards... this may take some time');
  const { data } = await client.query({ query: cachedCards });
  message.success('Cards updated successfully!');
  return data.cachedCards.filter(filterProblematicCards) || [];
};

const getSets = async () => {
  const sets = await getAllSets();
  return sets;
};

const updateCollection = async (
  type,
  collectionKey,
  lastUpdateKey,
  parsedCollection,
  shouldForceUpdate
) => {
  const getter = {
    sets: getSets,
    cards: getCards,
    creatureTypes: getAllCreatureTypes,
  };

  const stored = await getter[type](parsedCollection, shouldForceUpdate);

  localStorage.setItem(collectionKey, JSON.stringify(stored));
  localStorage.setItem(lastUpdateKey, Date.now());

  return stored;
};

const FORCE_UPDATE_IF_BEFORE = 1584399664770;

export const getCollectionFromCache = async type => {
  const lastUpdateKey = `lastUpdate-${type}`;
  const collectionKey = `stored-${type}`;

  const lastUpdate = localStorage.getItem(lastUpdateKey);
  const shouldForceUpdate = Number(lastUpdate) < FORCE_UPDATE_IF_BEFORE;

  const shouldUpdate =
    !lastUpdate ||
    Date.now() - Number(lastUpdate) > REFRESH_PERIOD ||
    shouldForceUpdate;

  const cachedCollection = localStorage.getItem(collectionKey);

  const parsedCollection = JSON.parse(cachedCollection);

  if (!shouldUpdate && cachedCollection) {
    return parsedCollection;
  }

  if (cachedCollection) {
    updateCollection(
      type,
      collectionKey,
      lastUpdateKey,
      parsedCollection,
      shouldForceUpdate
    );
    return parsedCollection;
  }

  return updateCollection(type, collectionKey, lastUpdateKey);
};
