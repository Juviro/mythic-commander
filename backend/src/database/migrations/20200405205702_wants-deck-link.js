export const up = async (knex) => {
  await knex.schema.alterTable('wantsLists', (table) => {
    table.integer('deckId').references('decks.id').onDelete('CASCADE');
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('wantsLists', (table) => {
    table.dropColumn('deckId');
  });
};
