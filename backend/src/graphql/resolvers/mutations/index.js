import collection from './collection';
import deck from './deck';
import lifetracker from './lifetracker';
import session from './session';
import tags from './tags';
import user from './user';
import wantsList from './wantsList';

export default {
  ...collection,
  ...deck,
  ...lifetracker,
  ...session,
  ...tags,
  ...user,
  ...wantsList,
};
