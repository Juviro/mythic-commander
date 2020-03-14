export default async (_, { cardIds }, { user: { id: userId }, db }) => {
  await db('collection')
    .whereIn('id', cardIds)
    .andWhere({ userId })
    .del();

  return true;
};
