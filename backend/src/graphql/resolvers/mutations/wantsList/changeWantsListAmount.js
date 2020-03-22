import { canAccessWantsList } from '../../../../auth/authenticateUser';

export default async (
  _,
  { cards, wantsListId },
  { user: { id: userId }, db }
) => {
  await canAccessWantsList(userId, wantsListId);

  const promises = cards.map(({ id, amount }) =>
    db('cardToWantsList')
      .where({ id, wantsListId })
      .update({ amount })
  );

  await Promise.all(promises);

  return db('cardToWantsList')
    .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
    .whereIn(
      'cards.id',
      cards.map(({ id }) => id)
    );
};
