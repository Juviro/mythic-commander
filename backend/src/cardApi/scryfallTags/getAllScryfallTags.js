import logger from '../../logging/logger';
import getApolloClient from './getApolloClient';
import { getScryfallTagsQuery } from './queries';

const fetchPage = async (apolloClient, page) => {
  const { data } = await apolloClient.query({
    query: getScryfallTagsQuery,
    variables: { input: { type: 'ORACLE_CARD_TAG', name: null, page } },
  });

  return data.tags;
};

const getAllScryfallTags = async () => {
  const apolloClient = await getApolloClient();

  const tags = [];

  let page = 1;
  while (true) {
    const { total, results } = await fetchPage(apolloClient, page);
    tags.push(...results);

    if (tags.length >= total) break;
    page += 1;
  }

  logger.info(`Fetched ${tags.length} tags`);

  return tags.map(({ category: _category, ...rest }) => rest);
};

export default getAllScryfallTags;
