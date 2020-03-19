import { canAccessWantsList } from '../../../../auth/authenticateUser';
import { updateLastEdit } from './helper';

export default async (_, { cardId, wantsListId }, { user, db }) => {
  await canAccessWantsList(user.id, wantsListId);

  await db('cardToWantsList')
    .where({ id: cardId, wantsListId })
    .del();

  await updateLastEdit(wantsListId, db);

  return db('wantsLists')
    .where({ id: wantsListId })
    .first();
};
