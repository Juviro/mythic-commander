import gql from 'graphql-tag';

export const getPriceDevelopment = gql`
  query priceDevelopment($cardId: String!, $currency: Currency!) {
    priceDevelopment(cardId: $cardId, currency: $currency) {
      date
      price
    }
  }
`;
