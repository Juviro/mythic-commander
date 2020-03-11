export const updateLastEdit = (deckId, db) =>
  db('decks')
    .where({ id: deckId })
    .update({
      lastEdit: new Date(),
    });
