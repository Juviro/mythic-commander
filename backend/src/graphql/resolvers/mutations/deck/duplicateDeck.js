import { canAccessDeck } from '../../../../auth/authenticateUser';
import randomId from '../../../../utils/randomId';

export default async (_, { deckId }, { user, db }) => {
  await canAccessDeck(user.id, deckId);

  const {
    rows: [{ id: newDeckId }],
  } = await db.raw(
    `
      INSERT INTO decks 
        ("userId", name, "imgSrc", "lastEdit", "createdAt", "id") 
      SELECT 
        "userId", CONCAT(name, ' - Copy'), "imgSrc", NOW() as "lastEdit", NOW() as "createdAt" , ?
      FROM decks WHERE id=? RETURNING id
    `,
    [randomId(), deckId]
  );

  await db.raw(
    `
    INSERT INTO "cardToDeck" 
      ("deckId", "id", "isCommander", amount, tags) 
    SELECT 
      ? as "deckId", "id", "isCommander", amount, tags
    FROM "cardToDeck" WHERE "deckId"=?
    `,
    [newDeckId, deckId]
  );

  return newDeckId;
};
