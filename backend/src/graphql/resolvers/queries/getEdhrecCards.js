import fetch from 'node-fetch';

const getUrl = (names, themeSuffix) => {
  const sanitizedNames = names
    .join(' ')
    .toLowerCase()
    .replace(/\s\/\/.*$/, '')
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s/g, '-');

  const themeAddon = themeSuffix || '';

  return `https://edhrec-json.s3.amazonaws.com/en/commanders/${sanitizedNames}${themeAddon}.json`;
};

const formatCards = cards => {
  return cards
    .map(({ cards, synergy, image_uris }) => {
      const [card] = cards;
      const imgKey = image_uris?.[0]?.match(/(\w\/\w)/)?.pop();

      return {
        id: card.id,
        oracle_id: card.oracle_id,
        imgKey,
        name: card.name,
        priceUsd: card.prices.tcgplayer?.price,
        priceEur: card.prices.cardmarket?.price,
        synergy,
      };
    })
    .sort((a, b) => (b.synergy || 0) - (a.synergy || 0));
};

const fetchCards = async (url, names) => {
  const result = await fetch(url);
  const json = await result.json();

  // partner commanders have to bee in a specific order
  // a redirect url is passed in those cases, but we can simply reverse the names as well
  if (json.redirect) {
    const newUrl = getUrl(names.reverse());
    return fetchCards(newUrl);
  }

  return json;
};

const getCardList = json => {
  const { cardlists } = json.container.json_dict;

  return cardlists?.map(({ header, cardviews, tag }) => ({
    key: tag,
    title: header,
    cards: formatCards(cardviews),
  }));
};

const getThemes = json => {
  const { themes } = json.panels.tribelinks;

  return themes?.map(tribe => ({
    title: tribe.value,
    urlSuffix: tribe['href-suffix'],
    count: tribe.count,
  }));
};

const getEdhrecCards = async (names, themeSuffix) => {
  if (!names.length) return null;

  const url = getUrl(names, themeSuffix);

  const json = await fetchCards(url, names);

  const cardLists = getCardList(json);
  const themes = getThemes(json);

  return {
    cardLists,
    themes,
  };
};

export default getEdhrecCards;
