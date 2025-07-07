import db from '../../database';

export const getScryfallTags = async () => {
  const scryfallTags = await db('scryfallTags');
  return scryfallTags;
};

export const storeScryfallTag = async ({ __typename, ...tag }) => {
  await db('scryfallTags').insert(tag).onConflict('id').merge();
};

export const updateTags = (cards) => {
  // Deduplicate cards array to prevent "ON CONFLICT DO UPDATE command cannot affect row a second time" error
  const uniqueCards = cards.reduce((acc, card) => {
    const key = `${card.oracleId}-${card.tagId}`;
    if (!acc.has(key)) {
      acc.set(key, card);
    }
    return acc;
  }, new Map());

  const deduplicatedCards = Array.from(uniqueCards.values());

  return db('scryfallTagToOracleId')
    .insert(deduplicatedCards)
    .onConflict(['oracleId', 'tagId'])
    .merge();
};
