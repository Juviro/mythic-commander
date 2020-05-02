export default async (_, { oracleIds }, { user: { id: userId }, db }) => {
  await db.raw(
    `
    DELETE FROM collection
    USING collection AS col
    LEFT JOIN "collectionWithOracle" AS colOra ON
      col.id = colOra.id
    WHERE
      collection.id = col.id AND
      colOra.oracle_id = ANY(?)
      AND col."userId" = ?;
  `,
    [oracleIds, userId]
  );

  return true;
};
