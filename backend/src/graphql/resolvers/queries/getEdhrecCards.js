import fetch from 'node-fetch';

import db from '../../../database';
import { normalizeName } from '../../../utils/normalizeName';

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

  return `https://json.edhrec.com/pages/commanders/${sanitizedNames}${themeSuffix}.json`;
};

const formatCards = async (cards, userId) => {
  const ownedCards = await db('collection')
    .leftJoin('cards', 'cards.id', 'collection.id')
    .whereIn(
      'name',
      cards.map((card) => card.name)
    )
    .andWhere('userId', userId);

  const promises = cards.map(({ url }) => {
    return fetch(`https://json.edhrec.com${url}`).then((res) =>
      res.json().catch(() => null)
    );
  });

  const fullCards = await Promise.all(promises);

  return fullCards
    .filter(Boolean)
    .map(({ prices, name, synergy, image_uris, id }) => {
      const [_, imgKey, __] = image_uris?.[0]?.match(
        /front\/(\w\/\w)\/(.*)\./
      ) ?? [null, '', name];

      return {
        id,
        imgKey,
        name,
        owned: ownedCards.some((card) => card.name === name),
        priceUsd: prices?.tcgplayer?.price,
        priceEur: prices?.cardmarket?.price,
        synergy,
      };
    })
    .sort((a, b) => (b.synergy || 0) - (a.synergy || 0));
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
  const { themes } = json.panels.tribelinks;

  return themes?.map((theme) => ({
    title: theme.value,
    urlSuffix: theme['href-suffix'],
    count: theme.count,
  }));
};

const getEdhrecCards = async (names, themeSuffix, userId) => {
  if (!names.length) return null;

  const url = getUrl(names, themeSuffix);

  const json = await fetchCards(url);

  const cardLists = getCardList(json, userId);
  const themes = getThemes(json);

  return {
    cardLists,
    themes,
  };
};

export default getEdhrecCards;
