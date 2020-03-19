import { ValidationError } from 'apollo-server-koa';
import { updateLastEdit } from './helper';

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
  const isAuthenticated = await db('wantsLists')
    .where({ userId, id: wantsListId })
    .first();
  if (!isAuthenticated) throw new ValidationError('Not authenticated');

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

  return db('cardToWantsList')
    .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
    .where({ wantsListId })
    .whereIn(
      'cards.id',
      cards.map(({ id }) => id)
    );
};
