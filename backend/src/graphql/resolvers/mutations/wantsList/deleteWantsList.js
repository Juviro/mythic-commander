import { canEditWantsList } from '../../../../auth/authenticateUser';

export default async (_, { wantsListId }, { user, db }) => {
  await canEditWantsList(user.id, wantsListId);

  await db('wantsLists')
    .where({ id: wantsListId })
    .del();

  return true;
};
