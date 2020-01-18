export const up = async knex => {
  await knex.schema.raw(`
  CREATE VIEW "cardsBySet" AS 
  SELECT oracle_id, ARRAY_AGG(DISTINCT CONCAT(set)) AS all_sets
  FROM cards 
  GROUP BY oracle_id; `);
};

export const down = async knex => {
  await knex.schema.raw(`
    DROP VIEW "cardsBySet"
  `);
};
