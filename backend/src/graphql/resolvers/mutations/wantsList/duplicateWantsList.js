import { canAccessWantsList } from '../../../../auth/authenticateUser';

export default async (_, { wantsListId }, { user: { id: userId }, db }) => {
  await canAccessWantsList(userId, wantsListId);

  const {
    rows: [{ id: newWantsListId }],
  } = await db.raw(
    `
      INSERT INTO "wantsLists" 
        ("userId", "deckId", name, "lastEdit", "createdAt") 
      SELECT 
        ?, 
        "deckId", 
        CONCAT(name, ' - Copy'), 
        NOW() as "lastEdit", 
        NOW() as "createdAt" 
      FROM "wantsLists" 
      WHERE id=? RETURNING id
    `,
    [userId, wantsListId]
  );

  await db.raw(
    `
      INSERT INTO "cardToWantsList" 
        ("wantsListId", "id", amount) 
      SELECT 
        ? as "wantsListId", "id", amount
      FROM "cardToWantsList" WHERE "wantsListId"=?
    `,
    [newWantsListId, wantsListId]
  );

  return db('wantsLists')
    .where({ id: newWantsListId, userId })
    .first();
};
