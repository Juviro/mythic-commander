export const up = async (knex) => {
  await knex.schema.alterTable('cardToWantsList', (table) => {
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('cardToWantsList', (table) => {
    table.dropColumn('createdAt');
  });
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.dropColumn('createdAt');
  });
};
