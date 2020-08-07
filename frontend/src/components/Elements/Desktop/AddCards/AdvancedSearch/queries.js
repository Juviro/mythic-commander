import gql from 'graphql-tag';

export const cardsBySet = gql`
  query cardsBySet($setKey: String!) {
    cardsBySet(setKey: $setKey) {
      i
      n
      o
      k
    }
  }
`;
