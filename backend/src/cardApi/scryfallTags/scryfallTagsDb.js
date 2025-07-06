import db from '../../database';

export const getScryfallTags = async () => {
  const scryfallTags = await db('scryfallTags');
  return scryfallTags;
};

export const storeScryfallTag = async ({ __typename, ...tag }) => {
  await db('scryfallTags').insert(tag).onConflict('id').merge();
};

export const updateTags = (cards) => {
  return db('scryfallTagToOracleId')
    .insert(cards)
    .onConflict(['oracleId', 'tagId'])
    .merge();
};
