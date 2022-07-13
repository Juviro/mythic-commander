import gql from 'graphql-tag';

export const cardsBySet = gql`
  query cardsBySet($setKey: String!) {
    cardsBySet(setKey: $setKey) {
      id
      name
      primary_variant
      collector_number
    }
  }
`;
