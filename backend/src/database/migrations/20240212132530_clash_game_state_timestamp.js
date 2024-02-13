export const up = async (knex) => {
  await knex.schema.alterTable('gameStates', (table) => {
    table.timestamp('created').defaultTo(knex.fn.now());
    table.timestamp('lastUpdate').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('gameStates', (table) => {
    table.dropColumn('created');
    table.dropColumn('lastUpdate');
  });
};
