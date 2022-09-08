import { canEditDeck } from '../../../../auth/authenticateUser';

export default async (_, { deckId, status }, { user: { id: userId }, db }) => {
  await canEditDeck(userId, deckId);

  await db('decks').update({ status }).where({ userId, id: deckId });

  return {
    id: deckId,
    status,
  };
};
