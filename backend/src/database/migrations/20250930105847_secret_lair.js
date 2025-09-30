export const up = async (knex) => {
  await knex.schema.createTable('secretLair', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('createdAt').notNullable();
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('secretLair');
};
