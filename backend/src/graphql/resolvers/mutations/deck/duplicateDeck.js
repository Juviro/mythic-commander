import { canAccessDeck } from '../../../../auth/authenticateUser';

export default async (_, { deckId }, { user, db }) => {
  await canAccessDeck(user.id, deckId);

  const {
    rows: [{ id: newDeckId }],
  } = await db.raw(
    `
    INSERT INTO decks 
      ("userId", name, "imgSrc", "lastEdit", "createdAt") 
    SELECT 
      "userId", CONCAT(name, ' - Copy'), "imgSrc", NOW() as "lastEdit", NOW() as "createdAt" 
    FROM decks WHERE id=? RETURNING id
    `,
    deckId
  );

  await db.raw(
    `
    INSERT INTO "cardToDeck" 
      ("deckId", "id", zone, amount) 
    SELECT 
      ? as "deckId", "id", zone, amount
    FROM "cardToDeck" WHERE "deckId"=?
    `,
    [newDeckId, deckId]
  );

  return newDeckId;
};
