import gql from 'graphql-tag';

export const getUser = gql`
  query getUser {
    user {
      id
      name
      avatar
      username
    }
  }
`;

export const setUsername = gql`
  mutation setUsername($username: String!) {
    setUsername(username: $username) {
      id
      username
    }
  }
`;
