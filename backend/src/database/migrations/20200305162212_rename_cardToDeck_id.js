export const up = async knex => {
  await knex.schema.alterTable('cardToDeck', table => {
    table.renameColumn('cardId', 'id');
    table.primary(['deckId', 'id']);
  });
};

export const down = async knex => {
  await knex.schema.alterTable('cardToDeck', table => {
    table.renameColumn('id', 'cardId');
    table.primary(['deckId', 'cardId']);
  });
};
