import { updateLastEdit } from './helper';
import { canAccessWantsList } from '../../../../auth/authenticateUser';
import unifyCardFormat from '../../unifyCardFormat';

const ON_CONFLICT = `
    ON CONFLICT (id, "wantsListId") 
    DO UPDATE SET 
      amount = "cardToWantsList".amount + EXCLUDED.amount
  `;

export default async (
  _,
  { cards, wantsListId },
  { user: { id: userId }, db }
) => {
  if (wantsListId === 'new-deck') {
    const [id] = await db('wantsLists')
      .insert({ userId })
      .returning('id');
    wantsListId = id;
  }

  await canAccessWantsList(userId, wantsListId);

  const cardsToInsert = cards.map(({ id, amount = 1 }) => ({
    id,
    amount,
    wantsListId,
  }));

  const query = db('cardToWantsList')
    .insert(cardsToInsert)
    .toString();

  await db.raw(query + ON_CONFLICT);

  await updateLastEdit(wantsListId, db);

  const insertedCards = await db('cardToWantsList')
    .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
    .where({ wantsListId })
    .whereIn(
      'cards.id',
      cards.map(({ id }) => id)
    );

  return insertedCards.map(unifyCardFormat(wantsListId));
};
