export const up = async (knex) => {
  await knex.schema.createTable('defaultCardVersions', (table) => {
    table.string('id').notNullable();
    table.string('oracle_id').notNullable();

    table
      .string('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');

    table.primary(['oracle_id', 'userId']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('defaultCardVersions');
};
