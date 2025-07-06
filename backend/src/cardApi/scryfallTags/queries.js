import gql from 'graphql-tag';

export const getScryfallTagsQuery = gql`
  query SearchTags($input: TagSearchInput!) {
    tags(input: $input) {
      page
      perPage
      results {
        id
        name
        slug
        description
        taggingCount
      }
      total
    }
  }
`;

export const getCreaturesByTagQuery = gql`
  query FetchTag(
    $type: TagType!
    $slug: String!
    $page: Int = 1
    $descendants: Boolean = false
  ) {
    tag: tagBySlug(type: $type, slug: $slug, aliasing: true) {
      id
      taggings(page: $page, descendants: $descendants) {
        total
        results {
          card {
            id
            oracleId
          }
        }
      }
    }
  }
`;
