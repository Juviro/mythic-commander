import gql from 'graphql-tag';

export const searchUsers = gql`
  query searchUsers($search: String!) {
    searchUsers(search: $search) {
      id
      username
    }
  }
`;

export const acceptFriendRequest = gql`
  mutation acceptFriendRequest($userId: String!) {
    acceptFriendRequest(userId: $userId)
  }
`;

export const removeFriend = gql`
  mutation removeFriend($userId: String!) {
    removeFriend(userId: $userId)
  }
`;

export const getFriends = gql`
  query friends {
    friends {
      id
      username
      avatar
      canAccept
      canWithdraw
    }
  }
`;

export const sendFriendRequest = gql`
  mutation sendFriendRequest($userId: String!) {
    sendFriendRequest(userId: $userId)
  }
`;
