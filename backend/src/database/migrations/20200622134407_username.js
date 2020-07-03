export const up = async knex => {
  await knex.schema.alterTable('users', table => {
    table.text('username');
    table.unique('username');
  });
};

export const down = async knex => {
  await knex.schema.alterTable('users', table => {
    table.dropColumn('username');
  });
};
