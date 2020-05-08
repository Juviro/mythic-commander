import gql from 'graphql-tag';

export const proxies = gql`
  query proxies($id: String!, $type: String!, $filter: String) {
    proxies(id: $id, type: $type, filter: $filter) {
      id
      imgKey
      amount
    }
  }
`;
