export const up = async knex => {
  await knex.schema.raw(`DROP MATERIALIZED VIEW "distinctCards"`);
  await knex.schema.raw(
    `CREATE TABLE "distinctCards" AS SELECT * FROM cards WHERE id='dummy';`
  );
  await knex.schema.raw(`ALTER TABLE "distinctCards" ADD PRIMARY KEY (id);`);
};

// eslint-disable-next-line
export const down = async knex => {
  await knex.schema.raw(`DROP TABLE "distinctCards"`);
  await knex.schema.raw(`
    CREATE MATERIALIZED VIEW "distinctCards" AS 
    WITH _cards AS (
        SELECT
        *,
        row_number() OVER (PARTITION BY name ORDER BY (prices->>'usd')::float ASC, frame DESC, released_at DESC) AS row_number
        FROM cards
        WHERE 'paper' = ANY(games) 
        AND layout <> ALL ( ARRAY[
            'token', 
            'double_faced_token', 
            'emblem',
            'planar',
            'vanguard',
            'scheme'
        ])
    )
    SELECT *
    FROM _cards
    WHERE row_number = 1;
`);
};
