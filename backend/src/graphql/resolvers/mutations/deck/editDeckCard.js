import { canEditDeck } from '../../../../auth/authenticateUser';
import { updateLastEdit } from './helper';
import unifyCardFormat from '../../unifyCardFormat';

export default async (_, { cardId, deckId, newProps }, { user, db }) => {
  await canEditDeck(user.id, deckId);

  try {
    const { isDefault, ...cardProps } = newProps;
    const newCardId = cardProps.id || cardId;

    if (isDefault) {
      const { oracle_id } = await db('cards')
        .select('oracle_id')
        .where({ id: newCardId })
        .first();

      await db('defaultCardVersions')
        .insert({
          userId: user.id,
          id: newCardId,
          oracle_id,
        })
        .onConflict(['oracle_id', 'userId'])
        .merge();
    }

    if (Object.keys(cardProps).length) {
      cardProps.amount =
        cardProps.amount && Math.min(Math.max(cardProps.amount, 0), 99);

      await db('cardToDeck').where({ id: cardId, deckId }).update(cardProps);
      await updateLastEdit(deckId, db);
    }

    const [updatedCard] = await db('cardToDeck')
      .leftJoin('cards', { 'cards.id': 'cardToDeck.id' })
      .where({ deckId, 'cardToDeck.id': newCardId });

    return unifyCardFormat(deckId)(updatedCard);
  } catch (e) {
    console.error('Error editing card:', e);
    throw new Error('That card edition already exists in this deck');
  }
};
