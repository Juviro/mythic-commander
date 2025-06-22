export const up = async (knex) => {
  await knex.schema.createTable('landCycleFavorites', (table) => {
    table.string('userId').references('users.id').notNullable();
    table.string('landCycleId').notNullable();
    table.primary(['userId', 'landCycleId']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('landCycleFavorites');
};
