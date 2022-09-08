export const up = async (knex) => {
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.integer('amount').defaultsTo(1).notNullable();

    table.string('oracle_id').notNullable();

    table.dropPrimary();

    table.primary(['oracle_id', 'deckId']);
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.dropColumn('amount');
    table.dropColumn('oracle_id');

    table.dropPrimary();
    table.primary(['deckId', 'cardId']);
  });
};
