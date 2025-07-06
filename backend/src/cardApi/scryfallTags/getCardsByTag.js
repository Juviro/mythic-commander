import getApolloClient from './getApolloClient';
import { getCreaturesByTagQuery } from './queries';

const fetchPage = async (apolloClient, slug, page) => {
  const { data } = await apolloClient.query({
    query: getCreaturesByTagQuery,
    variables: {
      type: 'ORACLE_CARD_TAG',
      slug,
      page,
      descendants: false,
    },
  });

  return {
    description: data.tag.description,
    ...data.tag.taggings,
  };
};

const getCardsByTag = async (tag) => {
  const { slug, id, taggingCount } = tag;
  if (taggingCount === 0) return [];
  const apolloClient = await getApolloClient();

  const cards = [];

  let page = 1;
  while (true) {
    const { total, results } = await fetchPage(apolloClient, slug, page);
    cards.push(...results);

    if (cards.length >= total) break;
    page += 1;
  }

  const formattedCards = cards.map(({ card }) => ({
    tagId: id,
    oracleId: card.oracleId,
  }));

  return formattedCards;
};

export default getCardsByTag;
