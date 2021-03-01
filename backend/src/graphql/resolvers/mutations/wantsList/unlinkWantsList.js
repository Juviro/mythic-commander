import { canEditWantsList } from '../../../../auth/authenticateUser';

export default async (_, { wantsListId }, { user: { id: userId }, db }) => {
  await canEditWantsList(userId, wantsListId);

  const [wantsList] = await db('wantsLists')
    .update({ deckId: null })
    .where({ id: wantsListId })
    .returning('*');

  return wantsList;
};
