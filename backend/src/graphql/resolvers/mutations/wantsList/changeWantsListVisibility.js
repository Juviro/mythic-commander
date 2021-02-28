import { canEditWantsList } from '../../../../auth/authenticateUser';

export default async (
  _,
  { wantsListId, visibility },
  { user: { id: userId }, db }
) => {
  await canEditWantsList(userId, wantsListId);

  return db('wantsLists')
    .update({ visibility })
    .where({ userId, id: wantsListId });
};
