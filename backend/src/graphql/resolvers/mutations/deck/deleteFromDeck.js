import { canEditDeck } from '../../../../auth/authenticateUser';
import { updateLastEdit } from './helper';

export default async (_, { cardId, cardIds, deckId }, { user, db }) => {
  if (!cardId && !cardIds) throw new Error('No cards specified');
  await canEditDeck(user.id, deckId);

  const ids = cardId ? [cardId] : cardIds;

  await db('cardToDeck').whereIn('id', ids).andWhere({ deckId }).del();

  await updateLastEdit(deckId, db);

  return db('decks').where({ id: deckId }).first();
};
