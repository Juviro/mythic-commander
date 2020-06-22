import collection from './collection';
import deck from './deck';
import session from './session';
import user from './user';
import wantsList from './wantsList';

export default {
  ...collection,
  ...deck,
  ...session,
  ...user,
  ...wantsList,
};
