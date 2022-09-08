export const up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('name');
    table.string('email');
    table.string('avatar');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('users');
};
