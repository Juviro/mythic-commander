import gql from 'graphql-tag';

export const collectionBySet = gql`
  query collectionBySet {
    collectionBySet {
      code
      name
      released_at
      set_type
      icon_svg_uri
      card_count
      uniqueCardCount

      totalCardsOwned
      uniqueCardsOwned
    }
  }
`;
