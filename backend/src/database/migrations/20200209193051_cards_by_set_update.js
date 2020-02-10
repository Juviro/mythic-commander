export const up = async knex => {
  await knex.schema.raw(`
        DROP VIEW "cardsBySet"
      `);
  await knex.schema.raw(`
        CREATE VIEW "cardsBySet" AS 
        WITH grouped AS (
            SELECT 
                oracle_id, 
                json_build_object(
                    'id',  id,
                    'set',  set
                    ) AS  sets
            FROM cards
            WHERE 'paper' = ANY(games)
        )
        SELECT oracle_id, ARRAY_AGG(sets) as all_sets from grouped GROUP BY oracle_id;
    `);
};

export const down = async knex => {
  await knex.schema.raw(`
        DROP VIEW "cardsBySet"
      `);
  await knex.schema.raw(`
        CREATE VIEW "cardsBySet" AS 
        SELECT oracle_id, ARRAY_AGG(DISTINCT CONCAT(set)) AS all_sets
        FROM cards 
        GROUP BY oracle_id;
      `);
};
