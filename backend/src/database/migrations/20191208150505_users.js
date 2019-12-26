exports.up = async knex => {
  await knex.schema.createTable('users', table => {
    table.string('id').primary();
    table.string('name');
    table.string('email');
    table.string('avatar');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('users');
};
