export default async (_, __, { user: { id: userId }, db }) => {
  const [wantsList] = await db('wantsLists')
    .insert({ userId })
    .returning('*');

  return wantsList;
};
