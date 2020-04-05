export default async (_, { wantsListId }, { user: { id: userId }, db }) => {
  const [wantsList] = await db('wantsLists')
    .update({ deckId: null })
    .where({ id: wantsListId, userId })
    .returning('*');

  return wantsList;
};
