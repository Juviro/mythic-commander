import gql from 'graphql-tag';

export const cardVariants = gql`
  query cardVariants {
    cardVariants
  }
`;

export const scryfallTags = gql`
  query scryfallTags {
    scryfallTags {
      slug
    }
  }
`;

export const secretLairs = gql`
  query secretLairs {
    secretLairs {
      id
      name
    }
  }
`;
