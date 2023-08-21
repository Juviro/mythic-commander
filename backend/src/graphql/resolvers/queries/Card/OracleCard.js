import { getAllSets, getTypes } from './helper';

const sumPrice = async (currency, sumPrice, oracle_id, userId, db) => {
  if (typeof sumPrice === 'number') return sumPrice;
  if (!userId) return 0;

  const {
    rows: [result],
  } = await db.raw(
    `
      SELECT SUM(coalesce(
        LEAST(
            (prices->>'${currency}')::float, 
            (prices->>'${currency}_foil')::float
          ), 0
          ) * amount + 
          coalesce(
        GREATEST(
          (prices->>'${currency}')::float, 
          (prices->>'${currency}_foil')::float
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
};

const resolver = {
  _id({ oracle_id }) {
    return oracle_id;
  },
  async owned(
    { oracle_id, type_line, owned },
    _,
    { db, user: { id: userId } }
  ) {
    if (!userId) return false;
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
    if (!userId) return [];

    return db('decks')
      .select('decks.*')
      .leftJoin('cardToDeckWithOracle', {
        'cardToDeckWithOracle.deckId': 'decks.id',
      })
      .where({ userId, oracle_id });
  },

  minPriceUsd({ minPriceUsd, prices: { usd, usd_foil } }) {
    if (minPriceUsd) return minPriceUsd ?? 0;
    return usd || usd_foil || 0;
  },
  minPriceEur({ minPriceEur, prices: { eur, eur_foil } }) {
    if (minPriceEur) return minPriceEur ?? 0;
    return eur || eur_foil || 0;
  },

  async containingWantsLists({ oracle_id }, _, { db, user: { id: userId } }) {
    if (!userId) return [];

    const result = await db('wantsLists')
      .select('wantsLists.*', 'cardToWantsListWithOracle.*', 'decks.imgSrc')
      .leftJoin('cardToWantsListWithOracle', {
        'cardToWantsListWithOracle.wantsListId': 'wantsLists.id',
      })
      .leftJoin('decks', {
        'decks.id': 'wantsLists.deckId',
      })
      .where('oracle_id', oracle_id)
      .where('wantsLists.userId', userId);

    return result.map(({ wantsListId, imgSrc, ...rest }) => ({
      ...rest,
      deck: imgSrc
        ? {
            imgSrc,
          }
        : undefined,
      id: wantsListId,
    }));
  },

  sumPriceUsd({ sumPriceUsd, oracle_id }, _, { db, user: { id: userId } }) {
    return sumPrice('usd', sumPriceUsd, oracle_id, userId, db);
  },

  sumPriceEur({ sumPriceEur, oracle_id }, _, { db, user: { id: userId } }) {
    return sumPrice('eur', sumPriceEur, oracle_id, userId, db);
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
    if (!userId) return 1;

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
