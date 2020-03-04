import { pick } from 'lodash';

const sortSets = (a, b) =>
  a.set_name > b.set_name
    ? 1
    : a.set_name < b.set_name
    ? -1
    : a.promo > b.promo
    ? 1
    : -1;

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
    cardsByOracleId: async (_, { oracle_id }, { db, user: { id: userId } }) => {
      const { rows: cards } = await db.raw(
        `
      SELECT 
        cards.*, 
        coalesce(collection.amount,0) as amount, 
        coalesce(collection."amountFoil",0) as "amountFoil" 
      FROM cards 
      LEFT JOIN collection
        ON collection.id = cards.id
        AND collection."userId" = ?
      WHERE cards.oracle_id = ? 
      AND 'paper' = ANY(games);
      `,
        [userId, oracle_id]
      );

      if (!cards.length) return null;

      const minimalCards = cards
        .map(card => ({
          ...card,
          image_uris: card.image_uris
            ? [card.image_uris]
            : card.card_faces.map(({ image_uris }) => image_uris),
        }))
        .sort(sortSets);

      const minimalCardsWithVersion = minimalCards.map(card => {
        const cardsWithSameSet = minimalCards.filter(
          ({ set }) => set === card.set
        );
        if (cardsWithSameSet.length === 1) return card;
        const version =
          cardsWithSameSet.findIndex(({ id }) => id === card.id) + 1;
        return {
          ...card,
          set_name: `${card.set_name} (Version ${version})`,
        };
      });

      const sharedStats = pick(cards[0], [
        'name',
        'oracle_id',
        'legalities',
        'rulings_uri',
      ]);
      return {
        ...sharedStats,
        all_sets: minimalCardsWithVersion,
      };
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
      return cards.map(({ name, id, oracle_id, ...rest }) => ({
        s: getImageUri(rest),
        n: name,
        i: id,
        o: oracle_id,
      }));
    },
  },
};
