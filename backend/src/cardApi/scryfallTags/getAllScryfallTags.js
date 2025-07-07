import getApolloClient from './getApolloClient';
import { getScryfallTagCount, getScryfallTagsQuery } from './queries';

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

  const tagsWithCountPromises = tags.map(async (tag) => {
    if (tag.taggingCount || !tag.category) return tag;

    const { data } = await apolloClient.query({
      query: getScryfallTagCount,
      variables: {
        type: 'ORACLE_CARD_TAG',
        slug: tag.slug,
        page: 1,
        descendants: false,
      },
    });
    return { ...tag, taggingCount: data.tag.taggings.total };
  });

  const tagsWithCount = await Promise.all(tagsWithCountPromises);
  return tagsWithCount.map(({ category: _category, ...rest }) => rest);
};

export default getAllScryfallTags;
