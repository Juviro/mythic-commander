export const up = async (knex) => {
  await knex.schema.createTable('gameStates', (table) => {
    table.string('id').primary().notNullable();

    table.specificType('state', 'jsonb');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('gameStates');
};
