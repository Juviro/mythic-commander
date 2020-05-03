import { updateLastEdit } from './helper';
import { canAccessDeck } from '../../../../auth/authenticateUser';

const ON_CONFLICT = `
    ON CONFLICT (id, "deckId") 
    DO UPDATE SET 
      amount = "cardToDeck".amount + EXCLUDED.amount, 
      "createdAt" = NOW()
  `;

export default async (_, { cards, deckId }, { user, db }) => {
  await canAccessDeck(user.id, deckId);

  const cardsToInsert = cards.map(({ id, amount = 1 }) => ({
    id,
    amount,
    deckId,
  }));

  const query = db('cardToDeck').insert(cardsToInsert);

  await db.raw(query + ON_CONFLICT);

  await updateLastEdit(deckId, db);

  return db('decks')
    .where({ id: deckId })
    .first();
};
