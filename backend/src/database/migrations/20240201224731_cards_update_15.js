import { CARD_FIELDS_ADDITION_15 } from '../cardFields';
import {
  DISTINCT_CARDS_1,
  DISTINCT_CARDS_PER_SET_1,
} from '../materializedViews';
import { addFieldsToCards } from '../migrationsHelper';

// eslint-disable-next-line import/no-commonjs
module.exports = addFieldsToCards(
  CARD_FIELDS_ADDITION_15,
  DISTINCT_CARDS_1,
  DISTINCT_CARDS_PER_SET_1
);
