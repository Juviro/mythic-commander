export default async (
  _,
  { deckId, newProperties: { imgSrc, name } },
  { user, db }
) => {
  await db('decks')
    .where({ userId: user.id, id: deckId })
    .update({
      imgSrc,
      name,
      lastEdit: new Date(),
    });

  return db('decks')
    .where({ id: deckId })
    .first();
};
