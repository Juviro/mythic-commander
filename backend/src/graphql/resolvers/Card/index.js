const getImageUri = card => {
  const fullUrl = card.image_uris
    ? card.image_uris.small
    : card.card_faces[0].image_uris.small;
  return fullUrl
    .replace('https://img.scryfall.com/cards/small/front/', '')
    .replace(/\.jpg\?\d+$/, '');
};

export default {
  Query: {
    card: async (_, { id }, { db }) => {
      const [card] = await db('cards')
        .leftJoin('cardsBySet', {
          'cards.oracle_id': 'cardsBySet.oracle_id ',
        })
        .where({ id });
      return card;
    },
    searchCard: async (_, { query, limit = null }, { db }) => {
      if (!query) return [];
      const { rows: cards } = await db.raw(
        `SELECT * 
         FROM "distinctCards" 
         LEFT JOIN "cardsBySet" 
          ON "distinctCards"."oracle_id" = "cardsBySet".oracle_id 
         WHERE name ILIKE ? LIMIT ? `,
        [`%${query}%`, limit]
      );
      return cards;
    },
    cachedCards: async (_, _1, { db }) => {
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
      return cards.map(({ name, id, ...rest }) => ({
        s: getImageUri(rest),
        n: name,
        i: id,
      }));
    },
  },
};
