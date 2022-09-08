export const up = async (knex) => {
  await knex.schema.raw('DROP VIEW IF EXISTS "cardToDeckWithOracle"');

  await knex.schema.alterTable('cardToDeck', (table) => {
    table.specificType('tags', 'text[]');
  });

  await knex.schema.raw(`
    CREATE VIEW "cardToDeckWithOracle" AS (
        SELECT "cardToDeck".*, cards.oracle_id
        FROM "cardToDeck"
        LEFT JOIN cards
        ON "cardToDeck".id = cards.id
    );
  `);
};

export const down = async (knex) => {
  await knex.schema.raw('DROP VIEW IF EXISTS "cardToDeckWithOracle"');

  await knex.schema.alterTable('cardToDeck', (table) => {
    table.dropColumn('tags');
  });

  await knex.schema.raw(`
    CREATE VIEW "cardToDeckWithOracle" AS (
        SELECT "cardToDeck".*, cards.oracle_id
        FROM "cardToDeck"
        LEFT JOIN cards
        ON "cardToDeck".id = cards.id
    );
  `);
};
