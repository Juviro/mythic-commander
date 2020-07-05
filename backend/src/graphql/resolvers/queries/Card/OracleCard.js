import { getAllSets, getTypes } from './helper';

const resolver = {
  _id({ oracle_id, resourceId }) {
    if (!resourceId) return oracle_id;
    return `${oracle_id}+${resourceId}`;
  },
  async owned(
    { oracle_id, type_line, owned },
    _,
    { db, user: { id: userId } }
  ) {
    if (typeof owned === 'boolean') return owned;
    if (type_line.startsWith('Basic')) return true;

    const [cardOwned] = await db('collectionWithOracle').where({
      userId,
      oracle_id,
    });
    return Boolean(cardOwned);
  },

  allSets({ oracle_id }, _, { db, user: { id: userId } }) {
    return getAllSets(oracle_id, userId, db);
  },

  primaryTypes(card) {
    return getTypes(card).primaryTypes;
  },
  subTypes(card) {
    return getTypes(card).subTypes || [];
  },

  containingDecks({ oracle_id }, _, { db, user: { id: userId } }) {
    return db('decks')
      .select('decks.*')
      .leftJoin('cardToDeckWithOracle', {
        'cardToDeckWithOracle.deckId': 'decks.id',
      })
      .where({ userId, oracle_id });
  },

  minPrice({ minPrice, prices: { usd, usd_foil } }) {
    if (minPrice) return minPrice;
    return usd || usd_foil || 0;
  },

  async containingWantsLists({ oracle_id }, _, { db, user: { id: userId } }) {
    const result = await db('wantsLists')
      .leftJoin('cardToWantsListWithOracle', {
        'cardToWantsListWithOracle.wantsListId': 'wantsLists.id',
      })
      .where('oracle_id', oracle_id)
      .where('userId', userId);

    return result.map(({ wantsListId, ...rest }) => ({
      ...rest,
      id: wantsListId,
    }));
  },

  async sumPrice({ sumPrice, oracle_id }, _, { db, user: { id: userId } }) {
    if (typeof sumPrice === 'number') return sumPrice;
    const {
      rows: [result],
    } = await db.raw(
      `
    SELECT SUM(coalesce(
      LEAST(
        (prices->>'usd')::float, 
        (prices->>'usd_foil')::float
        ), 0
        ) * amount + 
        coalesce(
      GREATEST(
        (prices->>'usd')::float, 
        (prices->>'usd_foil')::float
        ), 0
        ) * "amountFoil") AS price
    FROM "collectionWithOracle" 
    LEFT JOIN cards ON cards.id = "collectionWithOracle".id 
    WHERE cards.oracle_id = ? 
      AND "userId" = ?
    GROUP BY cards.oracle_id;
            `,
      [oracle_id, userId]
    );

    return result ? result.price : 0;
  },

  isTwoFaced({ image_uris }) {
    return !image_uris;
  },
  isCommanderLegal({ legalities }) {
    return legalities.commander === 'legal';
  },

  async totalAmount(
    { totalAmount, oracle_id },
    _,
    { db, user: { id: userId } }
  ) {
    if (totalAmount) return totalAmount;

    const { rows } = await db.raw(
      `
      SELECT 
      SUM(amount + "amountFoil") as amount
      FROM "collectionWithOracle" 
      LEFT JOIN cards ON cards.id = "collectionWithOracle".id 
      WHERE cards.oracle_id = ? 
      AND "userId" = ?
      GROUP BY cards.oracle_id;
      `,
      [oracle_id, userId]
    );
    return rows.length ? rows[0].amount : 0;
  },
};

export default resolver;
