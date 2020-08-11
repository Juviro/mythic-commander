import gql from 'graphql-tag';

export const ltPlayer = gql`
  query ltPlayer {
    ltPlayer {
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
