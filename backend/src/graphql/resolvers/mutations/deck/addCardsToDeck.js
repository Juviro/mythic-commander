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

  const { rows: cardsAlreadyInDeck } = await db.raw(
    `
    SELECT cards.id as "addingId", "cardToDeckWithOracle".id as "existingId"
    FROM cards 
    LEFT JOIN "cardToDeckWithOracle" 
    ON "cardToDeckWithOracle".oracle_id = cards.oracle_id 
    WHERE cards.id = ANY(?)
    AND "deckId" = ?;
    `,
    [cards.map(({ id }) => id), deckId]
  );

  const cardsToInsert = cards.map(({ id, amount = 1 }) => {
    const existingCard = cardsAlreadyInDeck.find(
      ({ addingId }) => addingId === id
    );
    const insertId = existingCard ? existingCard.existingId : id;

    return {
      id: insertId,
      amount,
      deckId,
    };
  });

  const query = db('cardToDeck').insert(cardsToInsert);

  await db.raw(query + ON_CONFLICT);

  await updateLastEdit(deckId, db);

  return db('decks')
    .where({ id: deckId })
    .first();
};
