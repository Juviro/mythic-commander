import collection from './collection';
import deck from './deck';
import lifetracker from './lifetracker';
import session from './session';
import user from './user';
import wantsList from './wantsList';

export default {
  ...collection,
  ...deck,
  ...lifetracker,
  ...session,
  ...user,
  ...wantsList,
};
