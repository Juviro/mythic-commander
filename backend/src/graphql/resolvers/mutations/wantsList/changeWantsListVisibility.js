import { canEditWantsList } from '../../../../auth/authenticateUser';

export default async (
  _,
  { wantsListId, visibility },
  { user: { id: userId }, db }
) => {
  await canEditWantsList(userId, wantsListId);

  await db('wantsLists')
    .update({ visibility })
    .where({ userId, id: wantsListId });

  return {
    id: wantsListId,
    visibility,
  };
};
