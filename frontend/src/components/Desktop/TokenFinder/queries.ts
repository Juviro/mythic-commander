import gql from 'graphql-tag';

export const tokenFinder = gql`
  query tokenFinder {
    tokenFinder {
      id
      name
      imgKey
      oracle_id
      isTwoFaced
    }
  }
`;
