import gql from 'graphql-tag';

export const allLists = gql`
  query allLists {
    allLists {
      wantsLists {
        id
        name
        deck {
          id
          name
          imgSrc
        }
      }
      decks {
        id
        name
        imgSrc
      }
    }
  }
`;
