import { updateLastEdit } from './helper';
import { canAccessDeck } from '../../../../auth/authenticateUser';

export default async (_, { cards, deckId }, { user, db }) => {
  await canAccessDeck(user.id, deckId);

  const { rows: cardsAlreadyInDeck } = await db.raw(
    `
    SELECT cards.id 
    FROM cards 
    LEFT JOIN "cardToDeckWithOracle" 
      ON "cardToDeckWithOracle".oracle_id = cards.oracle_id 
    WHERE cards.id = ANY(?)
      AND "deckId" = ?;
  `,
    [cards.map(({ id }) => id), deckId]
  );

  const cardIdsAlreadyInDeck = cardsAlreadyInDeck.map(({ id }) => id);
  const cardsToInsert = cards
    .filter(({ id }) => !cardIdsAlreadyInDeck.includes(id))
    .map(({ id, amount = 1 }) => ({
      id,
      amount,
      deckId,
    }));

  await db('cardToDeck').insert(cardsToInsert);

  await updateLastEdit(deckId, db);

  return db('decks')
    .where({ id: deckId })
    .first();
};
