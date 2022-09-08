import { canEditDeck } from '../../../../auth/authenticateUser';

export default async (
  _,
  { deckId, visibility },
  { user: { id: userId }, db }
) => {
  await canEditDeck(userId, deckId);

  await db('decks').update({ visibility }).where({ userId, id: deckId });

  return {
    id: deckId,
    visibility,
  };
};
