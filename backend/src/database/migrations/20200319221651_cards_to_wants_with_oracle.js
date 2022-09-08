export const up = async (knex) => {
  await knex.schema.raw(`
    CREATE VIEW "cardToWantsListWithOracle" AS (
        SELECT "cardToWantsList".*, cards.oracle_id
        FROM "cardToWantsList"
        LEFT JOIN cards
        ON "cardToWantsList".id = cards.id
    );
  `);
};

export const down = async (knex) => {
  await knex.schema.raw('DROP VIEW "cardToWantsListWithOracle"');
};
