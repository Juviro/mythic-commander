import gql from 'graphql-tag';

export const userPage = gql`
  query userPage($username: String!) {
    userPage(username: $username) {
      username
      userId
      wantsLists {
        id
        name
        lastEdit
        numberOfCards
        cardPreviews
      }
      decks {
        id
        name
        imgSrc
        colors
        lastEdit
        numberOfCards
        status
      }
      isCollectionPublic
      canSendFriendRequest
    }
  }
`;
