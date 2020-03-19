export default async (
  _,
  { wantsListId: id, newProperties: { name } },
  { user, db }
) => {
  const [result] = await db('wantsLists')
    .where({ userId: user.id, id })
    .update({
      name,
      lastEdit: new Date(),
    })
    .returning('*');

  return result;
};
