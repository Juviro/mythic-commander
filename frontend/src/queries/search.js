import gql from 'graphql-tag';
import { CARD_FIELDS } from './cards';
import { DECK_FIELDS } from './deck';
import { COLLECTION_CARD_FIELDS } from './collection';

export const search = gql`
  query search($query: String, $limit: Int) {
    search(query: $query,limit: $limit) {
        cards {
          ${CARD_FIELDS}
        }
        decks {
          ${DECK_FIELDS}
        }
        collection {
          ${COLLECTION_CARD_FIELDS}
        }
      }
    }
`;
