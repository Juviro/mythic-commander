export const up = async knex => {
  await knex.schema.raw(`
        DROP VIEW "distinctCards"
      `);
  await knex.schema.raw(`
        CREATE VIEW "distinctCards" AS 
        WITH _cards AS (
          SELECT
            *,
            row_number() OVER (PARTITION BY name ORDER BY (prices->>'usd')::float ASC, frame DESC, released_at DESC) AS row_number
          FROM cards
          WHERE 'paper' = ANY(games)
        )
        SELECT *
        FROM _cards
        WHERE row_number = 1;
      `);
};

// eslint-disable-next-line
export const down = () => {};
