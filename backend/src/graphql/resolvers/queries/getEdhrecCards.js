import fetch from 'node-fetch';

const formatCards = cards => {
  return cards
    .map(({ cards, synergy }) => {
      const [card] = cards;
      const imgKey = card.image_uris?.normal?.match(/(\w\/\w)/)?.pop();
      const prices = {
        usd: card.prices.tcgplayer?.price,
        eur: card.prices.cardmarket?.price,
      };

      return {
        id: card.id,
        oracle_id: card.oracle_id,
        imgKey,
        name: card.name,
        prices,
        synergy,
      };
    })
    .sort((a, b) => (b.synergy || 0) - (a.synergy || 0));
};

const fetchCards = async name => {
  const sanitizedName = name
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s/g, '-');
  const url = `https://edhrec-json.s3.amazonaws.com/en/commanders/${sanitizedName}.json`;
  const result = await fetch(url);
  return result.json();
};

const getEdhrecCards = async name => {
  const json = await fetchCards(name);

  const { cardlists } = json.container.json_dict;

  return cardlists?.map(({ header, cardviews }) => ({
    title: header,
    cards: formatCards(cardviews),
  }));
};

export default getEdhrecCards;
