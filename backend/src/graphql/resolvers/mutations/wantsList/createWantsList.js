import { canAccessDeck } from '../../../../auth/authenticateUser';

export default async (_, { deckId }, { user: { id: userId }, db }) => {
  const insert = { userId };
  if (deckId) {
    await canAccessDeck(userId, deckId);
    const { name } = await db('decks')
      .select('name')
      .where({ id: deckId })
      .first();
    insert.deckId = deckId;
    insert.name = `New list - ${name}`;
  }
  const [wantsList] = await db('wantsLists')
    .insert(insert)
    .returning('*');

  return wantsList;
};
