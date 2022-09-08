export const up = async (knex) => {
  await knex.schema.createTable('events', (table) => {
    table.string('key').notNullable().primary();
    table.string('value').notNullable();
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('events');
};
