export const up = async knex => {
  await knex.schema.raw(`DROP MATERIALIZED VIEW "distinctCards"`);
  await knex.schema.raw(`
    CREATE MATERIALIZED VIEW "distinctCards" AS 
    WITH _cards AS (
        SELECT
          *,
          row_number() OVER (PARTITION BY name ORDER BY is_special ASC, cardmarket_id DESC) AS row_number
        FROM cards
        WHERE 'paper' = ANY(games) 
        AND layout <> ALL ( ARRAY[
            'token', 
            'double_faced_token', 
            'emblem',
            'planar',
            'vanguard',
            'scheme',
            'art_series'
        ])
    )
    SELECT *
    FROM _cards
    WHERE row_number = 1;
    `);
};

// eslint-disable-next-line
export const down = () => {};
