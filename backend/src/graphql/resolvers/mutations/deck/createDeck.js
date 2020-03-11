export default async (_, __, { user: { id: userId }, db }) => {
  const [deckId] = await db('decks')
    .insert({ userId })
    .returning('id');

  return db('decks')
    .where({ id: deckId })
    .first();
};
