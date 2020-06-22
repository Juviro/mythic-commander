import gql from 'graphql-tag';
import { COLLECTION_CARD_FIELDS } from '../../../Desktop/Collection/Private/queries';

export const changeCollection = gql`
  mutation changeCollection(
    $cardOracleId: String!
    $added: [ChangeCollectionInput!]
    $edited: [ChangeCollectionInput!]
  ) {
    changeCollection(
      cardOracleId: $cardOracleId
      added: $added
      edited: $edited
    ) {
      ${COLLECTION_CARD_FIELDS}
    }
  }
`;

export const getCollectionNames = gql`
  query getCollectionNames {
    collection {
      id
      cards {
        id
        card {
          id
          name
        }
      }
    }
  }
`;
