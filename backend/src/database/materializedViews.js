export const DISTINCT_CARDS_1 = `
    CREATE MATERIALIZED VIEW "distinctCards" AS 
    WITH _cards AS (
        SELECT
        *,
        row_number() OVER (PARTITION BY oracle_id ORDER BY is_special ASC, cardmarket_id DESC) AS row_number
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
`;
export const DISTINCT_CARDS_PER_SET_1 = `
    CREATE MATERIALIZED VIEW "distinctCardsPerSet" AS 
    WITH _cards AS (
    SELECT
        *,
        row_number() OVER (PARTITION BY (name, set) ORDER BY is_special ASC, cardmarket_id DESC) AS row_number
    FROM cards
    )
    SELECT *
    FROM _cards
    WHERE row_number = 1;
`;

export const dropDistinctCards = async (knex) => {
  await knex.schema.raw(`DROP MATERIALIZED VIEW "distinctCards"`);
};

export const createDistinctCards = async (knex, query) => {
  await knex.schema.raw(query);
};

export const dropDistinctCardsPerSet = async (knex) => {
  await knex.schema.raw(`DROP MATERIALIZED VIEW "distinctCardsPerSet"`);
};

export const createDistinctCardsPerSet = async (knex, query) => {
  await knex.schema.raw(query);
};
