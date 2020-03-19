import { canAccessDeck } from '../../../../auth/authenticateUser';

export default async (
  _,
  { deckId, newProperties: { imgSrc, name } },
  { user, db }
) => {
  await canAccessDeck(user.id, deckId);
  const [result] = await db('decks')
    .where({ userId: user.id, id: deckId })
    .update({
      imgSrc,
      name,
      lastEdit: new Date(),
    })
    .returning('*');

  return result;
};
