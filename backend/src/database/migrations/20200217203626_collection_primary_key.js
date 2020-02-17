export const up = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.primary(['id', 'userId']);
  });
};

export const down = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.primary(['id', 'userId']);
  });
};
