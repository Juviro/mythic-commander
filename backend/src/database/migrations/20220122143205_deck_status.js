export const up = async (knex) => {
  await knex.schema.alterTable('decks', (table) => {
    table.enum('status', ['draft', 'active', 'archived']).defaultTo('draft');
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('decks', (table) => {
    table.dropColumn('status');
  });
};
