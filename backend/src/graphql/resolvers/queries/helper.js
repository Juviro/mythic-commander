const getImageUri = card => {
  const fullUrl = card.image_uris
    ? card.image_uris.small
    : card.card_faces[0].image_uris.small;
  return fullUrl
    .replace('https://img.scryfall.com/cards/small/front/', '')
    .replace(/\.jpg\?\d+$/, '');
};

export const getCachedCards = async db => {
  const { rows: cards } = await db.raw(`
    SELECT *  FROM "distinctCards" 
    WHERE layout <> ALL ( ARRAY[
      'token', 
      'double_faced_token', 
      'emblem',
      'planar',
      'vanguard',
      'scheme'
    ]);
    `);
  return cards.map(({ name, id, oracle_id, ...rest }) => ({
    s: getImageUri(rest),
    n: name,
    i: id,
    o: oracle_id,
  }));
};
