import db from '../../../database';
import { normalizeName } from '../../../utils/normalizeName';
import logger from '../../../logging/logger';

const getUrl = (names, themeSuffix) => {
  const sanitizedNames = names
    .map(normalizeName)
    .join(' ')
    .toLowerCase()
    .replace(/\s\/\/.*$/, '')
    .replace(/[^a-zA-Z- ]/g, '')
    .replace(/\s/g, '-');

  if (!themeSuffix) {
    return `https://json.edhrec.com/pages/commanders/${sanitizedNames}.json`;
  }

  return `https://json.edhrec.com/pages/commanders/${sanitizedNames}/${themeSuffix}.json`;
};

const formatCards = async (cards, userId) => {
  const cardNames = cards.map(({ name }) => name);

  const fullCards = await db('distinctCards')
    .whereIn('front_name', cardNames)
    .orWhereIn('name', cardNames);

  const cardsMap = fullCards.reduce((acc, card) => {
    acc[card.front_name] = card;
    acc[card.name] = card;
    return acc;
  }, {});

  const ownedOracleIds = await db('collection')
    .leftJoin('cards', 'collection.id', 'cards.id')
    .where('userId', userId)
    .pluck('oracle_id');

  const ownedCardsMap = ownedOracleIds.reduce((acc, oracleId) => {
    acc[oracleId] = true;
    return acc;
  }, {});

  const allCards = cardNames
    .map((name) => {
      const card = cardsMap[name];
      if (!card) {
        return null;
      }

      return {
        ...card,
        owned: ownedCardsMap[card.oracle_id],
      };
    })
    .filter((card) => card?.id);

  return allCards;
};

const fetchCards = async (url) => {
  const result = await fetch(url);
  const json = await result.json();

  // partner commanders have to bee in a specific order
  if (json.redirect) {
    const newUrl = `https://json.edhrec.com/pages${json.redirect}.json`;
    return fetchCards(newUrl);
  }

  return json;
};

const getCardList = (json, userId) => {
  const { cardlists } = json.container.json_dict;

  return cardlists?.map(({ header, cardviews, tag }) => ({
    key: tag,
    title: header,
    cards: formatCards(cardviews, userId),
  }));
};

const getThemes = (json) => {
  const { taglinks } = json.panels;
  if (!taglinks) return [];

  return taglinks?.map((theme) => ({
    title: theme.value,
    urlSuffix: theme.slug,
    count: theme.count,
  }));
};

const getEdhrecCards = async (names, themeSuffix, userId) => {
  if (!names.length) return null;

  try {
    const url = getUrl(names, themeSuffix);

    const json = await fetchCards(url);

    const cardLists = getCardList(json, userId);
    const themes = getThemes(json);

    return {
      cardLists,
      themes,
    };
  } catch (error) {
    logger.error('Error fetching EDHREC cards:', error);
    return null;
  }
};

export default getEdhrecCards;
