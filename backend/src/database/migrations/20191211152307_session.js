export const up = async (knex) => {
  await knex.schema.createTable('sessions', (table) => {
    table.increments();
    table
      .string('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table.string('sessionId').notNullable();
    table.timestamp('expires');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('sessions');
};
