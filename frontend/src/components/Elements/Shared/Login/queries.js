import gql from 'graphql-tag';

export const login = gql`
  mutation login($token: String!) {
    login(token: $token) {
      session
      user {
        id
        name
        avatar
        email
        username
        featureFlags
      }
    }
  }
`;
