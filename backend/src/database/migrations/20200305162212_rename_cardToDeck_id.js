export const up = async (knex) => {
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.renameColumn('cardId', 'id');
    table.dropPrimary();
    table.primary(['deckId', 'id']);
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.renameColumn('id', 'cardId');
    table.dropPrimary();
    table.primary(['deckId', 'cardId']);
  });
};
