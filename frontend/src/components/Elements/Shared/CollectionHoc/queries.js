import gql from 'graphql-tag';

import { COLLECTION_CARD_FIELDS } from '../../../Desktop/Collection/Private/queries';

export const paginatedCollection = gql`
  query paginatedCollection($limit: Int!, $offset: Int!, $orderBy: String!, $search: String) {
    paginatedCollection(limit: $limit, offset: $offset, orderBy: $orderBy, search: $search) {
      hasMore
      nextOffset
      totalResults
      cards {
        ${COLLECTION_CARD_FIELDS}
      }
    }
  }
`;
