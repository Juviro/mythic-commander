export const up = async (knex) => {
  await knex.schema.alterTable('collectionSnapshot', (table) => {
    table.integer('valueEur');
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('collectionSnapshot', (table) => {
    table.dropColumn('valueEur');
  });
};
