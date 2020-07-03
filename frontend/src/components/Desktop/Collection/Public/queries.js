import { gql } from 'graphql-tag';
import { COLLECTION_CARD_FIELDS } from '../Private/queries';

export const getPublicCollectionDesktop = gql`
  query getPublicCollectionDesktop($username: String!) {
    publicCollection(username: $username) {
        ${COLLECTION_CARD_FIELDS}
    }
  }
`;
