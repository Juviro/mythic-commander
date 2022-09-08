export const up = async (knex) => {
  await knex.schema.raw(`DROP MATERIALIZED VIEW "distinctTokens"`);
  await knex.schema.raw(`
      CREATE MATERIALIZED VIEW "distinctTokens" AS 
      WITH _cards AS (
          SELECT
            *,
            row_number() OVER (PARTITION BY oracle_id ORDER BY is_special ASC, cardmarket_id DESC) AS row_number
          FROM cards
          WHERE 'paper' = ANY(games) 
          AND (layout = 'token' OR layout = 'emblem')
      )
      SELECT *
      FROM _cards
      WHERE row_number = 1;
      `);
};

// eslint-disable-next-line
export const down = async () => {};
