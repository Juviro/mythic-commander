export const up = async knex => {
  await knex.schema.alterTable('decks', table => {
    table
      .enum('visibility', ['private', 'hidden', 'public'])
      .defaultTo('private');
  });
};

export const down = async knex => {
  await knex.schema.alterTable('decks', table => {
    table.dropColumn('visibility');
  });
};
