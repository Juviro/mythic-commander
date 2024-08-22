import collection from './collection';
import deck from './deck';
import lifetracker from './lifetracker';
import session from './session';
import tags from './tags';
import updateCards from './updateCards';
import user from './user';
import wantsList from './wantsList';
import friends from './friends';

export default {
  ...collection,
  ...deck,
  ...lifetracker,
  ...session,
  ...tags,
  ...updateCards,
  ...user,
  ...wantsList,
  ...friends,
};
