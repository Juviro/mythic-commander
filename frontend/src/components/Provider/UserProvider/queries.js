import gql from 'graphql-tag';

export const getUser = gql`
  query getUser {
    user {
      id
      name
      avatar
      username
      featureFlags
      openFriendRequests
    }
  }
`;
