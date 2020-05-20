import { canAccessDeck } from '../../../../auth/authenticateUser';
import randomId from '../../../../utils/randomId';

export default async (_, { deckId }, { user: { id: userId }, db }) => {
  const newWantsList = { userId, id: randomId() };
  if (deckId) {
    await canAccessDeck(userId, deckId);
    const { name } = await db('decks')
      .select('name')
      .where({ id: deckId })
      .first();
    newWantsList.deckId = deckId;
    newWantsList.name = `New list - ${name}`;
  }
  const [wantsList] = await db('wantsLists')
    .insert(newWantsList)
    .returning('*');

  return wantsList;
};
