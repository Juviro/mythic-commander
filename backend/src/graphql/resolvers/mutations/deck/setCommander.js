import { canAccessDeck } from '../../../../auth/authenticateUser';

export default async (_, { cardIds, deckId }, { user: { id: userId }, db }) => {
  await canAccessDeck(userId, deckId);

  await db('cardToDeck')
    .where({ isCommander: true })
    .update({ isCommander: false });

  await db('cardToDeck')
    .whereIn('id', cardIds)
    .update({ isCommander: true });

  return db('decks')
    .where({ userId, id: deckId })
    .first();
};
