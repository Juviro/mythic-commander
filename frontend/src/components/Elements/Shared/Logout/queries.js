import gql from 'graphql-tag';

export const logout = gql`
  mutation logout($sessionId: String!) {
    logout(sessionId: $sessionId)
  }
`;
