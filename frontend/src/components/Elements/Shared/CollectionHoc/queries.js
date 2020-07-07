import gql from 'graphql-tag';

import { COLLECTION_CARD_FIELDS } from '../../../Desktop/Collection/queries';

export const paginatedCollection = gql`
  query paginatedCollection($limit: Int!, $offset: Int!, $orderBy: String!, $search: String, $username: String) {
    paginatedCollection(limit: $limit, offset: $offset, orderBy: $orderBy, search: $search, username: $username) {
      hasMore
      nextOffset
      totalResults
      cards {
        ${COLLECTION_CARD_FIELDS}
      }
    }
  }
`;
