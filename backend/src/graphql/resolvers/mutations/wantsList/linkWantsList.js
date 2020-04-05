import { canAccessDeck } from '../../../../auth/authenticateUser';

export default async (
  _,
  { wantsListId, deckId },
  { user: { id: userId }, db }
) => {
  await canAccessDeck(userId, deckId);

  await db('wantsLists')
    .update({ deckId })
    .where({ id: wantsListId, userId });

  const {
    rows: [wantsList],
  } = await db.raw(
    `
        SELECT "wantsLists".*, row_to_json(decks) as deck
        FROM "wantsLists" 
        LEFT JOIN decks 
          ON decks.id = "wantsLists"."deckId" 
        WHERE "wantsLists".id = ?;
    `,
    [wantsListId]
  );

  return wantsList;
};
