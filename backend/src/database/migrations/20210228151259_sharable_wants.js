export const up = async knex => {
  await knex.schema.alterTable('wantsLists', table => {
    table
      .enum('visibility', ['private', 'hidden', 'public'])
      .defaultTo('private');
  });
};

export const down = async knex => {
  await knex.schema.alterTable('wantsLists', table => {
    table.dropColumn('visibility');
  });
};
