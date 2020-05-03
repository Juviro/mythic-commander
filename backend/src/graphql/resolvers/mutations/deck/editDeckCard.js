import { canAccessDeck } from '../../../../auth/authenticateUser';
import { updateLastEdit } from './helper';
import unifyCardFormat from '../../unifyCardFormat';

export default async (_, { cardId, deckId, newProps }, { user, db }) => {
  await canAccessDeck(user.id, deckId);

  try {
    await db('cardToDeck')
      .where({ id: cardId, deckId })
      .update(newProps);
    await updateLastEdit(deckId, db);

    const newCardId = newProps.id || cardId;
    const [updatedCard] = await db('cardToDeck')
      .leftJoin('cards', { 'cards.id': 'cardToDeck.id' })
      .where({ deckId, 'cardToDeck.id': newCardId });

    return unifyCardFormat(deckId)(updatedCard);
  } catch {
    throw new Error('That card edition already exists in this deck');
  }
};
