import { canEditDeck } from '../../../../auth/authenticateUser';
import { updateLastEdit } from './helper';

const setLandsForDeck = async (
  _,
  { deckId, lands },
  { user: { id: userId }, db }
) => {
  await canEditDeck(userId, deckId);

  if (!lands.length) {
    return db('decks').where({ id: deckId }).first();
  }

  await db.raw(
    `
    DELETE FROM "cardToDeck"
    WHERE "deckId" = ? AND id IN (
      SELECT cards.id 
      FROM "cardToDeck" 
      LEFT JOIN cards on cards.id = "cardToDeck".id 
      WHERE cards.type_line ~ '^(\\w+\\s)\\?Land' 
      AND "deckId"=?
    )
  `,
    [deckId, deckId]
  );

  const cardsToInsert = lands.map(({ id, amount }) => ({
    id,
    amount,
    deckId,
  }));

  await db('cardToDeck').insert(cardsToInsert);

  await updateLastEdit(deckId, db);

  return db('decks').where({ id: deckId }).first();
};

export default setLandsForDeck;
