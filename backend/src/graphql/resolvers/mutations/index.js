import collection from './collection';
import deck from './deck';
import session from './session';
import wantsList from './wantsList';

export default {
  ...collection,
  ...deck,
  ...session,
  ...wantsList,
};
