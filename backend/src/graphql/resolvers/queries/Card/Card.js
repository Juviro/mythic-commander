import { getAllSets, getPreviewImg, getTypes, getImageKey } from './helper';

const resolver = {
  async owned({ oracle_id }, _, { db, user: { id: userId } }) {
    const [owned] = await db('collectionWithOracle').where({
      userId,
      oracle_id,
    });
    return Boolean(owned);
  },
  allSets({ oracle_id, type_line }, _, { db, user: { id: userId } }) {
    if (type_line.startsWith('Basic')) return [];
    return getAllSets(oracle_id, userId, db);
  },
  primaryTypes(card) {
    return getTypes(card).primaryTypes;
  },
  subTypes(card) {
    return getTypes(card).subTypes || [];
  },
  previewImg(card) {
    return getPreviewImg(card);
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
    if (sumPrice) return sumPrice;
    const {
      rows: [{ price }],
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
    return price;
  },
  imgKey(card) {
    return getImageKey(card);
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
