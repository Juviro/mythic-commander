export const up = async knex => {
  await knex.schema.raw(`
      DROP MATERIALIZED VIEW "distinctCardsPerSet"
  `);
  await knex.schema.raw(`
            CREATE MATERIALIZED VIEW "distinctCardsPerSet" AS 
            WITH _cards AS (
              SELECT
                *,
                row_number() OVER (PARTITION BY name ORDER BY is_special ASC, cardmarket_id DESC) AS row_number
              FROM cards
            )
            SELECT *
            FROM _cards
            WHERE row_number = 1;
          `);
  await knex.raw(`REFRESH MATERIALIZED VIEW "distinctCardsPerSet"`);
};

// eslint-disable-next-line no-empty-function
export const down = () => {};
