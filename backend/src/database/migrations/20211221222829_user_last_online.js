export const up = async knex => {
  await knex.schema.alterTable('users', table => {
    table.timestamp('lastOnline');
  });
};

export const down = async knex => {
  await knex.schema.alterTable('users', table => {
    table.dropColumn('lastOnline');
  });
};
