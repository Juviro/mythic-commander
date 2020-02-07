import gql from 'graphql-tag';

const SEARCH_CARD_FIELDS = `
  name
  id
  card_faces {
    image_uris {
      small
    }
  }
  image_uris {
    small
  }
`;

export const search = gql`
  query search($query: String, $limit: Int) {
    search(query: $query,limit: $limit) {
        decks {
          id
          name
          imgSrc
        }
        cards {
          ${SEARCH_CARD_FIELDS}
        }
        collection {
          ${SEARCH_CARD_FIELDS}
        }
      }
    }
`;
