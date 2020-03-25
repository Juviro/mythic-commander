import { canAccessWantsList } from '../../../../auth/authenticateUser';

export default async (
  _,
  { cardId, wantsListId, newProps },
  { user: { id: userId }, db }
) => {
  await canAccessWantsList(userId, wantsListId);

  const [id] = await db('cardToWantsList')
    .where({ id: cardId, wantsListId })
    .update(newProps)
    .returning('id');

  return db('cardToWantsList')
    .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
    .where({ 'cards.id': id, wantsListId })
    .first();
};
