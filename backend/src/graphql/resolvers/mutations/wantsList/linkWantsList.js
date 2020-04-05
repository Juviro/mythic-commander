import { canAccessDeck } from '../../../../auth/authenticateUser';

export default async (
  _,
  { wantsListId, deckId },
  { user: { id: userId }, db }
) => {
  await canAccessDeck(userId, deckId);

  const [wantsLists] = await db('wantsLists')
    .update({ deckId })
    .where({ id: wantsListId, userId })
    .returning('*');

  return wantsLists;
};
