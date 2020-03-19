import { canAccessWantsList } from '../../../../auth/authenticateUser';

export default async (
  _,
  { wantsListId, newProperties: { name } },
  { user, db }
) => {
  await canAccessWantsList(user.id, wantsListId);
  const [result] = await db('wantsLists')
    .where({ userId: user.id, id: wantsListId })
    .update({
      name,
      lastEdit: new Date(),
    })
    .returning('*');

  return result;
};
