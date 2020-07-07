import gql from 'graphql-tag';
import { COLLECTION_CARD_FIELDS } from '../../../Desktop/Collection/queries';

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
