exports.up = async knex => {
  await knex.schema.createTable('users', table => {
    table.string('id').primary()
    table.string('name')
  })
}

exports.down = async knex => {
  await knex.schema.dropTable('users')
}
