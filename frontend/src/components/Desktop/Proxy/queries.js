import gql from 'graphql-tag';

export const proxies = gql`
  query proxies($type: String!, $value: String, $filter: String) {
    proxies(type: $type, value: $value, filter: $filter) {
      id
      imgKey
      name
      isTwoFaced
      amount
    }
  }
`;

export const tokens = gql`
  query tokens {
    tokens {
      id
      imgKey
      name
      isTwoFaced
    }
  }
`;
