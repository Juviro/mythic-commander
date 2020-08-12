import gql from 'graphql-tag';

export const ltPlayers = gql`
  query ltPlayers {
    ltPlayers {
      name
      img
      color
      lastEdit
    }
  }
`;

export const deleteLtPlayer = gql`
  mutation deleteLtPlayer($name: String!) {
    deleteLtPlayer(name: $name)
  }
`;
