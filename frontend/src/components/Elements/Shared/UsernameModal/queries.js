import gql from 'graphql-tag';

export const setUsername = gql`
  mutation setUsername($username: String!) {
    setUsername(username: $username) {
      id
      username
    }
  }
`;
