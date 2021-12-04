import gql from 'graphql-tag';

export const setDefaultTags = gql`
  mutation setDefaultTags($tags: [String!]!, $oracleId: String!) {
    setDefaultTags(tags: $tags, oracleId: $oracleId)
  }
`;
