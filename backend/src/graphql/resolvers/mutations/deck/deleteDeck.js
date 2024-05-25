import { canEditDeck } from '../../../../auth/authenticateUser';

export default async (_, { deckId }, { user, db }) => {
  await canEditDeck(user.id, deckId);

  await db('decks').where({ id: deckId }).del();

  return true;
};
