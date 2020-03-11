import { canAccessDeck } from '../../../../auth/authenticateUser';
import { updateLastEdit } from './helper';

export default async (_, { cardId, deckId }, { user, db }) => {
  await canAccessDeck(user.id, deckId);

  await db('cardToDeck')
    .where({ id: cardId, deckId })
    .del();

  await updateLastEdit(deckId, db);

  return db('decks')
    .where({ id: deckId })
    .first();
};
