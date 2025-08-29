import getApolloClient from './getApolloClient';
import { getCreaturesByTagQuery } from './queries';

const fetchPage = async (apolloClient, slug, page) => {
  const { data } = await apolloClient.query({
    query: getCreaturesByTagQuery,
    variables: {
      type: 'ORACLE_CARD_TAG',
      slug,
      page,
      descendants: true,
    },
  });

  return data.tag.taggings;
};

const getCardsByTag = async (tag, currentScryfallCount) => {
  const { slug, id } = tag;
  const apolloClient = await getApolloClient();

  const cards = [];

  let page = 1;
  let taggingCount = 0;
  while (true) {
    const { total, results } = await fetchPage(apolloClient, slug, page);
    cards.push(...results);
    taggingCount = total;

    if (total === currentScryfallCount) {
      return { taggingCount, cards: [] };
    }

    if (cards.length >= total) break;
    page += 1;
  }

  const formattedCards = cards.map(({ card }) => ({
    tagId: id,
    oracleId: card.oracleId,
  }));

  return { taggingCount, cards: formattedCards };
};

export default getCardsByTag;
