import fetch from 'node-fetch';

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

const fetchCards = async names => {
  const sanitizedNames = names
    .join(' ')
    .toLowerCase()
    .replace(/\s\/\/.*$/, '')
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s/g, '-');
  const url = `https://edhrec-json.s3.amazonaws.com/en/commanders/${sanitizedNames}.json`;
  const result = await fetch(url);
  const json = await result.json();

  // partner commanders have to bee in a specific order
  // a redirect url is passed in those cases, but we can simply reverse the names as well
  if (json.redirect) {
    return fetchCards(names.reverse());
  }
  return json;
};

const getEdhrecCards = async names => {
  if (!names.length) return [];

  const json = await fetchCards(names);

  const { cardlists } = json.container.json_dict;

  return cardlists?.map(({ header, cardviews, tag }) => ({
    key: tag,
    title: header,
    cards: formatCards(cardviews),
  }));
};

export default getEdhrecCards;
