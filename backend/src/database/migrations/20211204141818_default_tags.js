export const up = async knex => {
  await knex.schema.createTable('defaultTags', table => {
    table
      .string('oracle_id')
      .notNullable()
      .primary();

    table.specificType('tags', 'text[]').notNullable();
  });
};

export const down = async knex => {
  await knex.schema.dropTable('defaultTags');
};
