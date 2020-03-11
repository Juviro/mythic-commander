export const up = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.dropColumn('oracle_id');
  });

  await knex.schema.raw(`
        CREATE VIEW "collectionWithOracle" AS (
            SELECT collection.*, cards.oracle_id
            FROM collection
            LEFT JOIN cards
            ON collection.id = cards.id
        );
      `);
};

export const down = async knex => {
  await knex.schema.raw(`
        DROP VIEW "collectionWithOracle"
      `);

  await knex.schema.alterTable('collection', table => {
    table.string('oracle_id');
  });

  await knex.schema.raw(`
    UPDATE collection
    SET oracle_id = cards.oracle_id
    FROM cards
    WHERE cards.id = collection.id;
  `);
};
