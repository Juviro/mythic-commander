import gql from 'graphql-tag';

export const setDefaultTag = gql`
  mutation setDefaultTag($tag: String!, $oracleId: String!) {
    setDefaultTag(tag: $tag, oracleId: $oracleId)
  }
`;
