import { getOrderColumn, addNameClause } from './cardSearch';

export default (
  db,
  userId,
  limit,
  offset,
  orderBy,
  search,
  addedWithin,
  allOwned
) => {
  if (!userId) return [];
  const [order, direction = 'asc'] = orderBy.split('-');

  return db
    .with(
      'grouped',
      db.raw(
        `
        SELECT
          ${allOwned ? 'true as owned,' : ''}
          SUM(amount) as "amountOwned", 
          SUM("amountFoil") as "amountOwnedFoil", 
          SUM("amountFoil" + amount) as "totalAmount", 
          MAX("createdAt") as "createdAt",
          SUM(
            coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * amount + 
            coalesce(GREATEST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * "amountFoil"
          ) as "sumPrice",
          MIN(coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0)) as "minPrice",
          MAX(cards.id) as id
          FROM collection 
          LEFT JOIN cards 
            ON cards.id = collection.id 
          WHERE "userId" = ?
          ${
            addedWithin
              ? `AND "createdAt" > current_date - interval '${Number(
                  addedWithin
                )}' hour`
              : ''
          }
          GROUP BY cards.oracle_id
        `,
        userId
      )
    )
    .select(db.raw('*, count(*) OVER() AS "amountUnique"'))
    .from('grouped')
    .where(q => {
      if (search) addNameClause(q, search);
    })
    .limit(limit)
    .offset(offset)
    .leftJoin('cards', { 'cards.id': 'grouped.id' })
    .orderByRaw(`${getOrderColumn(order)} ${direction.toUpperCase()}`);
};
