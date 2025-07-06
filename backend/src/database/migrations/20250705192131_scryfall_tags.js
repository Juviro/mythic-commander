export const up = async (knex) => {
  await knex.schema.createTable('scryfallTags', (table) => {
    table.string('id').primary();
    table.string('name');
    table.text('description');
    table.string('slug');
    table.integer('taggingCount');
    table.specificType('ancestry', 'jsonb');
  });

  await knex.schema.createTable('scryfallTagToOracleId', (table) => {
    table.string('oracleId').notNullable();
    table
      .string('tagId')
      .references('scryfallTags.id')
      .onDelete('CASCADE')
      .notNullable();
    table.primary(['oracleId', 'tagId']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('scryfallTagToOracleId');
  await knex.schema.dropTable('scryfallTags');
};
