import gql from 'graphql-tag';

export const proxies = gql`
  query proxies($value: String!, $type: String!, $filter: String) {
    proxies(value: $value, type: $type, filter: $filter) {
      id
      imgKey
      amount
    }
  }
`;
