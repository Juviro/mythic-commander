export const up = async (knex) => {
  await knex.schema.alterTable('gameStates', (table) => {
    table.specificType('lobby', 'jsonb');
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('gameStates', (table) => {
    table.dropColumn('lobby');
  });
};
