export const up = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.dropColumn('set');
    table.string('oracle_id');
    table.primary(['id', 'userId', 'isFoil']);
  });

  await knex.schema.raw(`
    UPDATE collection
    SET oracle_id = cards.oracle_id
    FROM cards
    WHERE cards.id = collection.id;
  `);
};

export const down = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.dropColumn('oracle_id');
    table.string('set');
    table.dropPrimary();
  });
};
