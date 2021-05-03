import gql from 'graphql-tag';

export const unlinkWantsListDesktop = gql`
  mutation unlinkWantsListDesktop($wantsListId: String!) {
    unlinkWantsList(wantsListId: $wantsListId) {
      id
      deck {
        id
        imgSrc
        name
      }
    }
  }
`;
