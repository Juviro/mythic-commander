import { canEditWantsList } from '../../../../auth/authenticateUser';
import unifyCardFormat from '../../unifyCardFormat';

export default async (
  _,
  { cardId, wantsListId, newProps },
  { user: { id: userId }, db }
) => {
  await canEditWantsList(userId, wantsListId);

  const [id] = await db('cardToWantsList')
    .where({ id: cardId, wantsListId })
    .update(newProps)
    .returning('id');

  const updatedCard = await db('cardToWantsList')
    .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
    .where({ 'cards.id': id, wantsListId })
    .first();

  return unifyCardFormat(wantsListId)(updatedCard);
};
