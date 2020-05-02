import { message } from 'antd';
import { getAllSets, getAllCreatureTypes } from '../../network/mtgApi';
import client from '../../network/graphqlClient';
import { cachedCards, numberOfCachedCards } from './queries';

const REFRESH_PERIOD = 24 * 60 * 60 * 1000;

const getCards = async (currentCards = [], shouldForceUpdate) => {
  const {
    data: { numberOfCachedCards: updatedCardCount },
  } = await client.query({
    query: numberOfCachedCards,
  });

  if (updatedCardCount === currentCards.length && !shouldForceUpdate) {
    return currentCards;
  }

  message.info('Updating cards... this may take some time');
  const { data } = await client.query({ query: cachedCards });
  message.success('Cards updated successfully!');
  return data.cachedCards || [];
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
