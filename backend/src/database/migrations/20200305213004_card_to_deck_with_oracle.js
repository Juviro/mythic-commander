export const up = async (knex) => {
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.dropColumn('oracle_id');
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
  await knex.schema.raw('DROP VIEW "cardToDeckWithOracle"');

  await knex.schema.alterTable('cardToDeck', (table) => {
    table.string('oracle_id');
  });

  await knex.schema.raw(`
      UPDATE "cardToDeck"
      SET oracle_id = cards.oracle_id
      FROM cards
      WHERE cards.id = "cardToDeck".id;
    `);
};
